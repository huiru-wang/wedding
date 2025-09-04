import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "huiru-wang-images.oss-cn-beijing.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;
