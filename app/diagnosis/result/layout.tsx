import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '診断結果 | なんでも総選挙',
    description: 'あなたの価値観診断の結果と詳細分析を確認！',
    openGraph: {
        title: '価値観診断結果 | なんでも総選挙',
        description: 'あなたの価値観タイプを発見！',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=価値観診断結果', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=価値観診断結果'],
    },
};

export default function DiagnosisResultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
