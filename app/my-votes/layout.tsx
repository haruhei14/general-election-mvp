import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'マイレポート | なんでも総選挙',
    description: 'あなたの投票履歴と分析結果を確認できます。',
    openGraph: {
        title: 'マイレポート | なんでも総選挙',
        description: 'あなたの投票履歴と分析結果',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=マイレポート', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=マイレポート'],
    },
};

export default function MyVotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
