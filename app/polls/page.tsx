import { getPolls, GENRES } from '@/lib/data';
import Link from 'next/link';
import { Clock, TrendingUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お題一覧 | なんでも総選挙',
    description: 'すべてのお題を一覧で表示。新着順や人気順でソートできます。',
    openGraph: {
        title: 'お題一覧 | なんでも総選挙',
        description: 'すべてのお題を一覧で表示',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=お題一覧', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=お題一覧'],
    },
};

export default async function PollsPage(props: { searchParams: Promise<{ sort?: string; genre?: string }> }) {
    const { sort, genre } = await props.searchParams;
    const allPolls = await getPolls(genre);

    // Sort logic
    const sortedPolls = sort === 'popular'
        ? [...allPolls].sort((a, b) => {
            const aVotes = a.options.reduce((sum, o) => sum + o.votes, 0);
            const bVotes = b.options.reduce((sum, o) => sum + o.votes, 0);
            return bVotes - aVotes;
        })
        : allPolls; // Default: newest first (already ordered by created_at desc)

    return (
        <div className="container-responsive py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                        <List className="w-6 h-6" />
                    </span>
                    お題一覧
                </h1>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Sort */}
                    <div className="flex gap-2">
                        <Link
                            href={genre ? `/polls?genre=${genre}` : '/polls'}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all",
                                !sort || sort === 'newest'
                                    ? "bg-slate-900 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                            )}
                        >
                            <Clock className="w-4 h-4" />
                            新着順
                        </Link>
                        <Link
                            href={genre ? `/polls?sort=popular&genre=${genre}` : '/polls?sort=popular'}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all",
                                sort === 'popular'
                                    ? "bg-slate-900 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                            )}
                        >
                            <TrendingUp className="w-4 h-4" />
                            人気順
                        </Link>
                    </div>

                    {/* Genre Filter */}
                    {genre && (
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">|</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                {genre}
                            </span>
                            <Link
                                href={sort ? `/polls?sort=${sort}` : '/polls'}
                                className="text-slate-400 hover:text-slate-600 text-sm"
                            >
                                ✕ 解除
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Poll List */}
            <div className="space-y-4">
                {sortedPolls.length > 0 ? (
                    sortedPolls.map(poll => {
                        const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
                        return (
                            <Link
                                key={poll.id}
                                href={`/poll/${poll.id}`}
                                className="block bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {poll.genre}
                                        </span>
                                        <h2 className="font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {poll.title}
                                        </h2>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-xl font-black text-slate-800">{totalVotes}</div>
                                        <div className="text-[10px] text-slate-400 font-bold">票</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">お題がまだありません</p>
                    </div>
                )}
            </div>
        </div>
    );
}
