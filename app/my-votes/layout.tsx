import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'マイレポート | なんでも総選挙',
    description: 'あなたの投票履歴と分析結果です。',
    robots: {
        index: false,
        follow: false,
    },
};

export default function MyVotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
