import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ランク・実績 | なんでも総選挙',
    description: '投票活動に応じたランクと獲得した称号を確認できます。',
    openGraph: {
        title: 'ランク・実績 | なんでも総選挙',
        description: '投票で称号を獲得しよう！',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=ランク・実績', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=ランク・実績'],
    },
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
