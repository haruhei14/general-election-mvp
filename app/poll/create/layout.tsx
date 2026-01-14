import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お題を作成 | なんでも総選挙',
    description: 'みんなに聞いてみたいお題を作成して、投票を集めよう！',
    openGraph: {
        title: 'お題を作成 | なんでも総選挙',
        description: 'みんなに聞いてみたいお題を作成しよう',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=お題を作成', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=お題を作成'],
    },
};

export default function CreatePollLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
