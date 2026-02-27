import { NextConfig } from "next";

import { settings } from "@/lib";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/github",
        destination: settings.links.github,
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
