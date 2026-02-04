import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      // Exchange code for session
      const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/login?error=${encodeURIComponent(error.message)}`
        );
      }

      if (session?.user) {
        const userId = session.user.id;
        console.log("Auth callback successful for user:", session.user.email);

        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarded, org_id')
          .eq('id', userId)
          .single();

        console.log("Profile check:", profile);

        // Determine redirect destination
        let redirectTo = next || '/dashboard/overview';

        if (!profile || !profile.onboarded || !profile.org_id) {
          // New user or not onboarded → send to onboarding
          console.log("User needs onboarding, redirecting to /onboarding");
          redirectTo = '/onboarding';
        } else if (next) {
          // Use the next parameter if provided
          redirectTo = next;
        }

        console.log("Redirecting to:", redirectTo);
        return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
      }
    } catch (err) {
      console.error("Unexpected callback error:", err);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=Authentication failed`
      );
    }
  }

  // No code provided, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/auth/login`);
}
