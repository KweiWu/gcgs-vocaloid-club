
import type { MetadataRoute } from "next";

const siteUrl = "https://gcgs-vocaloid-club.netlify.app";

const locales = ["zh-CN", "en", "ja"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "zh-CN" ? 1 : 0.9,
  }));
}
