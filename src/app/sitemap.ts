import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sorelle-pizzaria.vercel.app";
  const agora = new Date();

  return [
    {
      url: baseUrl,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
