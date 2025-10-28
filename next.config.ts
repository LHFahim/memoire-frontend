import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "memoire-assets.s3.ap-southeast-2.amazonaws.com",
      "img1.hscicdn.com",
      "plus.unsplash.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
  },
};

export default nextConfig;
