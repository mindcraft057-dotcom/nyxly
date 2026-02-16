import { Metadata, MetadataRoute } from "next";
import { getAllArticles } from "../lib/articles";

const baseUrl = 'https://nyxly-phi.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const articles = getAllArticles();

    const articleUrls = articles.map((article) => ({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/chronotype`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/dream`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...articleUrls,
    ];
}
