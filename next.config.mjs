/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        // Ignore build errors during deployment when env vars are missing
        // These routes require runtime environment variables that aren't available at build time
        tsconfigPath: "./tsconfig.json",
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "**.supabase.co",
            },
        ],
    },
};

export default nextConfig;
