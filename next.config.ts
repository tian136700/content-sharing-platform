import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR: pages use `export const revalidate = 3600`
  // Deploy to Cloudflare Pages via @opennextjs/cloudflare or next-on-pages
};

export default nextConfig;
