import type { NextConfig } from "next";

const nextConfig:NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',

      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'placehold.net',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;



