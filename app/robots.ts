import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nandemo-vote.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // 管理画面などがあれば除外
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
