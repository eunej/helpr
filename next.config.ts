import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cursor Agents Window port-forward previews.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "*.cursor.com",
  ],
};

export default nextConfig;
