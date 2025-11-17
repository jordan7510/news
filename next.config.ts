import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'argusnewdashboard.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: "standalone",
  reactStrictMode: false,
  // compiler:{
  //   removeConsole:true
  // }
};

export default nextConfig;
