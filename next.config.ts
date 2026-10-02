import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cursor Agents Window port-forward previews.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "*.cursor.com",
  ],
  transpilePackages: [
    "@solana/wallet-adapter-base",
    "@solana/wallet-adapter-react",
    "@solana/wallet-adapter-react-ui",
    "@solana/wallet-adapter-phantom",
    "@solana/wallet-adapter-solflare",
    "@solana/wallet-adapter-unsafe-burner",
  ],
};

export default nextConfig;
