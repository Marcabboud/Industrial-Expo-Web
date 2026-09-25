import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the local Wi-Fi load the dev server (with live reload).
  allowedDevOrigins: ["192.168.1.93"],
};

export default nextConfig;
