import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '管理ページ | なんでも総選挙',
    description: 'なんでも総選挙の管理ページです。',
    openGraph: {
        title: '管理ページ | なんでも総選挙',
        description: '管理者専用ページ',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=なんでも総選挙', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=なんでも総選挙'],
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
