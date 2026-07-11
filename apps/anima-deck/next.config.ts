import type { NextConfig } from "next";

// CF Pages / static host — set PAGES_BASE_PATH only if project-site subpath needed
const pagesBase = process.env.PAGES_BASE_PATH?.trim() || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: pagesBase || undefined,
  assetPrefix: pagesBase || undefined,
  transpilePackages: ["@anime-forge/config", "@anime-forge/ui"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
