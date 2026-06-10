import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR: pages use `export const revalidate = 3600`
  // Built for Cloudflare Pages via @cloudflare/next-on-pages
  // Build command: npm run pages:build
  // Output directory: .vercel/output/static
};

export default nextConfig;
