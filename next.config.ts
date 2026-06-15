import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["rayna-spriggy-scarlett.ngrok-free.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yqsnerhfucwebmaweudf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
