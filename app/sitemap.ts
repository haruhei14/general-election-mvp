import { MetadataRoute } from 'next';
import { getPolls } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nandemo-vote.com';

    // 1. 静的ページ
    const staticRoutes = [
        '',              // トップページ
        '/polls',        // お題一覧
        '/genres',       // ジャンル一覧
        '/tags',         // タグ一覧
        '/ranking',      // 人気ランキング
        '/poll/create',  // お題作成
        '/diagnosis',    // 価値観診断
        '/my-votes',     // マイレポート
        '/achievements', // ランク・実績
        '/about',        // サイトについて
        '/privacy',      // プライバシーポリシー
        '/contact',      // お問い合わせ
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. お題詳細ページ
    const polls = await getPolls();
    const pollRoutes = polls.map((poll) => ({
        url: `${baseUrl}/poll/${poll.id}`,
        lastModified: new Date(poll.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...pollRoutes];
}
