import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nandemo-vote.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // 管理画面を除外
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
