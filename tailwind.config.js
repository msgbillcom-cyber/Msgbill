/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                success: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    500: "#22c55e",
                    600: "#16a34a",
                    DEFAULT: "#22c55e",
                },
                warning: {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    500: "#f59e0b",
                    600: "#d97706",
                    DEFAULT: "#f59e0b",
                },
                error: {
                    50: "#fef2f2",
                    100: "#fee2e2",
                    500: "#ef4444",
                    600: "#dc2626",
                    DEFAULT: "#ef4444",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["JetBrains Mono", "Courier New", "monospace"],
            },
            fontSize: {
                "xs": ["0.75rem", { lineHeight: "1rem" }],
                "sm": ["0.875rem", { lineHeight: "1.25rem" }],
                "base": ["1rem", { lineHeight: "1.5rem" }],
                "lg": ["1.125rem", { lineHeight: "1.75rem" }],
                "xl": ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
                "5xl": ["3rem", { lineHeight: "1" }],
            },
            boxShadow: {
                "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                "DEFAULT":
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                "md":
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                "lg":
                    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                "xl":
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
                "glow": "0 0 20px rgba(14, 165, 233, 0.3)",
                "glow-lg":
                    "0 0 40px rgba(14, 165, 233, 0.4), 0 0 80px rgba(14, 165, 233, 0.2)",
                "premium":
                    "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)",
            },
            backdropBlur: {
                xs: "2px",
                sm: "4px",
                md: "12px",
                lg: "16px",
                xl: "24px",
                "2xl": "40px",
                "3xl": "64px",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-mesh":
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "shimmer":
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "fade-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                "fade-out": {
                    "0%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
                "slide-in-from-top": {
                    "0%": { transform: "translateY(-10px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                "slide-in-from-bottom": {
                    "0%": { transform: "translateY(10px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                "slide-in-from-left": {
                    "0%": { transform: "translateX(-10px)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                "slide-in-from-right": {
                    "0%": { transform: "translateX(10px)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "float-slow": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "glow-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)",
                        opacity: "1",
                    },
                    "50%": {
                        boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)",
                        opacity: "0.9",
                    },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.9)", opacity: 0 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
                "bounce-in": {
                    "0%": { transform: "scale(0)", opacity: 0 },
                    "50%": { transform: "scale(1.1)" },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
                "slide-up": {
                    "0%": { transform: "translateY(100%)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                "slide-down": {
                    "0%": { transform: "translateY(-100%)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                "rotate-slow": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "wiggle": {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                "ping-slow": {
                    "75%, 100%": {
                        transform: "scale(1.5)",
                        opacity: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "fade-out": "fade-out 0.3s ease-out",
                "slide-in-from-top": "slide-in-from-top 0.4s ease-out",
                "slide-in-from-bottom": "slide-in-from-bottom 0.4s ease-out",
                "slide-in-from-left": "slide-in-from-left 0.4s ease-out",
                "slide-in-from-right": "slide-in-from-right 0.4s ease-out",
                "float": "float 3s ease-in-out infinite",
                "float-slow": "float-slow 6s ease-in-out infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "scale-in": "scale-in 0.3s ease-out",
                "bounce-in":
                    "bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                "slide-up": "slide-up 0.4s ease-out",
                "slide-down": "slide-down 0.4s ease-out",
                "rotate-slow": "rotate-slow 20s linear infinite",
                "wiggle": "wiggle 1s ease-in-out infinite",
                "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
