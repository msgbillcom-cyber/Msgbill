"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClientSideClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    profile: any | null;
    orgId: string | undefined;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (
    { children },
) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);
    const supabase = createClientSideClient();
    const router = useRouter();
    const pathname = usePathname();

    const fetchProfile = async (userId: string, userEmail?: string) => {
        setProfileLoading(true);
        try {
            console.log("Fetching profile for user:", userId);

            // Add a 5-second timeout to the Supabase query to prevent hanging the app
            const profilePromise = supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Profile fetch timeout")), 5000)
            );

            const { data, error } = await Promise.race([
                profilePromise,
                timeoutPromise,
            ]) as any;

            if (error) {
                console.error("Error fetching profile:", error);

                // If profile not found, try to create it
                if (error.code === "PGRST116" && userEmail) {
                    console.log("Profile not found, creating new profile...");
                    const { data: newProfile, error: createError } =
                        await supabase
                            .from("profiles")
                            .insert([
                                {
                                    id: userId,
                                    email: userEmail,
                                    onboarded: false,
                                    created_at: new Date().toISOString(),
                                },
                            ])
                            .select()
                            .single();

                    if (createError) {
                        console.error("Error creating profile:", createError);
                        setProfile(null);
                        setProfileLoading(false);
                        return null;
                    }

                    console.log("Successfully created and set new profile");
                    setProfile(newProfile);
                    setProfileLoading(false);
                    return newProfile;
                }
                setProfile(null);
            } else {
                // Security check: Verify that the fetched profile ID matches the requested userId
                if (data && data.id !== userId) {
                    console.error(
                        "Critical Security Error: Fetched profile ID mismatch!",
                        { requested: userId, fetched: data.id },
                    );
                    setProfile(null);
                } else {
                    console.log(
                        "Profile fetched successfully for:",
                        userId,
                        "Onboarded:",
                        data?.onboarded,
                    );
                    setProfile(data);
                }
            }
            setProfileLoading(false);
            return data;
        } catch (err) {
            console.error("Unexpected error in fetchProfile:", err);
            setProfile(null);
            setProfileLoading(false);
            return null;
        }
    };

    useEffect(() => {
        // 1. Initial Session Check & Subscription
        const initializeAuth = async () => {
            try {
                // Failsafe: Ensure loading stops after 8 seconds
                const timeoutId = setTimeout(() => {
                    setLoading((prev) => {
                        if (prev) {
                            console.warn(
                                "Auth initialization timed out, forcing loading false",
                            );
                            return false;
                        }
                        return prev;
                    });
                }, 8000);

                const { data: { session }, error } = await supabase.auth
                    .getSession();
                if (error) throw error;

                const currentUser = session?.user ?? null;
                console.log("Initialize Auth Session:", currentUser?.email);
                setUser(currentUser);

                if (currentUser) {
                    await fetchProfile(currentUser.id, currentUser.email);
                } else {
                    setProfile(null);
                }

                clearTimeout(timeoutId);
            } catch (error) {
                console.error("Error initializing auth:", error);
                setUser(null);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(
                    "Auth State Change Event:",
                    event,
                    "User:",
                    session?.user?.email,
                );
                const currentUser = session?.user ?? null;

                // If the user changed or a specific auth event happened
                if (
                    event === "SIGNED_IN" || event === "USER_UPDATED" ||
                    (event === "INITIAL_SESSION" && currentUser)
                ) {
                    setUser(currentUser);
                    if (currentUser) {
                        // Clear old profile immediately to prevent data leak between user switches
                        setProfile(null);
                        await fetchProfile(currentUser.id, currentUser.email);
                    }
                } else if (event === "SIGNED_OUT") {
                    setUser(null);
                    setProfile(null);
                }
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // 2. Route Protection
    useEffect(() => {
        // Wait until initial auth check is DONE
        if (loading) return;

        // Determine if we are on a protected route
        const isProtectedRoute = pathname.startsWith("/dashboard") ||
            pathname === "/onboarding";
        const isAuthRoute = pathname.startsWith("/auth");

        if (user) {
            // User is logged in
            if (isProtectedRoute) {
                // If profile is still loading, wait for it before making redirect decisions
                if (profileLoading && !profile) return;

                if (pathname.startsWith("/dashboard")) {
                    if (profile && !profile.onboarded) {
                        console.log(
                            "Redirecting to onboarding: User on dashboard but not onboarded",
                        );
                        router.push("/onboarding");
                    }
                } else if (pathname === "/onboarding") {
                    if (profile?.onboarded) {
                        console.log(
                            "Redirecting to dashboard: User on onboarding but already onboarded",
                        );
                        router.push("/dashboard/overview");
                    }
                }
            } else if (isAuthRoute) {
                // Logged in user trying to access login/signup - redirect to dashboard
                router.push("/dashboard/overview");
            }
        } else {
            // No user logged in
            if (isProtectedRoute) {
                console.log(
                    "Redirecting to login: Protected route accessed without user session",
                );
                router.push("/auth/login");
            }
        }
    }, [pathname, user, loading, profile, profileLoading, router]);

    // 3. Inactivity Auto-Logout
    useEffect(() => {
        if (!user) return;

        const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
        let inactivityTimer: NodeJS.Timeout;

        const resetTimer = () => {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(async () => {
                console.log("User inactive for 30 minutes, logging out...");
                await signOut();
            }, TIMEOUT_MS);
        };

        // Events to track activity
        const events = ["mousedown", "keydown", "scroll", "touchstart"];

        // Attach listeners
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        // Initialize timer
        resetTimer();

        return () => {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [user]);

    const signOut = async () => {
        console.log("🔴 LOGOUT INITIATED - IMMEDIATE MODE");

        // IMMEDIATE: Clear localStorage
        localStorage.clear();
        console.log("✅ localStorage cleared");

        // IMMEDIATE: Clear sessionStorage
        sessionStorage.clear();
        console.log("✅ sessionStorage cleared");

        // IMMEDIATE: Clear all cookies
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/",
            );
        });
        console.log("✅ Cookies cleared");

        // Fire and forget Supabase signOut (don't wait)
        supabase.auth.signOut().catch((e) =>
            console.error("Supabase signOut error:", e)
        );

        // IMMEDIATE REDIRECT - Use replace to prevent back button
        console.log("🚀 REDIRECTING NOW to /auth/login");
        window.location.replace("/auth/login");
    };

    const refreshProfile = async () => {
        if (user) {
            return await fetchProfile(user.id, user.email);
        }
        return null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                profile,
                orgId: profile?.org_id,
                signOut,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
