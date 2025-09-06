import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false, // 禁用实验性的服务器源映射
  },
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
