import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ✅ Main sitemap index
      {
        source: "/sitemap.xml",
        destination: "https://api.theheadlineworld.com/sitemap.xml",
      },
      // ✅ News sitemap
      {
        source: "/sitemap-news.xml",
        destination: "https://api.theheadlineworld.com/sitemap-news.xml",
      },
      // ✅ Language-specific sitemaps
      {
        source: "/sitemap-:lang.xml",
        destination: "https://api.theheadlineworld.com/sitemap-:lang.xml",
      },
      // ✅ Sitemap index for all (monthly)
      {
        source: "/sitemap-all.xml",
        destination: "https://api.theheadlineworld.com/sitemap-all.xml",
      },
      // ✅ Monthly archive sitemaps
      {
        source: "/sitemap-all-:year-:month.xml",
        destination: "https://api.theheadlineworld.com/sitemap-all-:year-:month.xml",
      },
    ];
  },
};

export default nextConfig;
