import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img1.hscicdn.com",
      "plus.unsplash.com",
      "images.unsplash.com", // common Unsplash CDN
      "source.unsplash.com", // if you ever use it
    ],
  },
};

export default nextConfig;
