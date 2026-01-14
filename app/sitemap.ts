import { getPolls } from '@/lib/data';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nandemo-vote.com';

    // 静的ページ
    const routes = [
        '',
        '/ranking',
        '/diagnosis',
        '/about',
        '/contact',
        '/privacy',
        '/poll/create',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 動的ページ（お題詳細）
    const polls = await getPolls();
    const pollRoutes = polls.map((poll) => ({
        url: `${baseUrl}/poll/${poll.id}`,
        lastModified: new Date(poll.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...pollRoutes];
}
