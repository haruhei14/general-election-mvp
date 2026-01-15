import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { getPollsByIds } from '@/lib/data';
import { MarugotoQuiz } from '@/components/MarugotoQuiz';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const theme = MARUGOTO_THEMES.find(t => t.id === id);
    if (!theme) return {};

    const title = `${theme.title}総選挙 | まるごと総選挙`;
    const description = `${theme.title}について10問連続で答える総選挙！${theme.description} みんなの結果と比較してあなたの推しや価値観を分析しよう。`;
    const url = `https://nandemo-vote.com/marugoto/${id}`;

    return {
        title,
        description,
        keywords: [theme.title, '総選挙', 'クイズ', '診断', 'アンケート', '投票', 'ランキング'],
        openGraph: {
            title,
            description,
            type: 'website',
            url,
            siteName: 'なんでも総選挙',
            images: [
                {
                    url: 'https://nandemo-vote.com/red-curtain-bg.png',
                    width: 1200,
                    height: 630,
                    alt: `${theme.title}総選挙`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function MarugotoDetailPage({ params }: Props) {
    const { id } = await params;
    const theme = MARUGOTO_THEMES.find(t => t.id === id);

    if (!theme) {
        notFound();
    }

    const polls = await getPollsByIds(theme.questionIds);

    if (polls.length === 0) {
        // Fallback or error if no polls found (e.g. not seeded yet)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                お題データの読み込みに失敗しました。
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
            <MarugotoQuiz theme={theme} initialPolls={polls} />
        </div>
    );
}
