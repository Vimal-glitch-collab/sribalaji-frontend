// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sribalajiearthmovers.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#machinery`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/#projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
