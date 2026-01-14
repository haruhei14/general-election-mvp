import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { getPollsByIds } from '@/lib/data';
import { MarugotoQuiz } from '@/components/MarugotoQuiz';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const theme = MARUGOTO_THEMES.find(t => t.id === params.id);
    if (!theme) return {};

    return {
        title: `${theme.title} | まるごと総選挙`,
        description: theme.description,
    };
}

export default async function MarugotoDetailPage({ params }: Props) {
    const theme = MARUGOTO_THEMES.find(t => t.id === params.id);

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
