import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '価値観診断 | なんでも総選挙',
    description: '10問の質問に答えて、あなたの価値観タイプを診断！',
    openGraph: {
        title: '価値観診断 | なんでも総選挙',
        description: '10問であなたの価値観タイプを診断',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=価値観診断', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=価値観診断'],
    },
};

export default function DiagnosisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
