import { getPolls } from '@/lib/data';
import Link from 'next/link';
import { Trophy, TrendingUp, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function RankingPage() {
    const allPolls = await getPolls();

    // Sort by total votes descending
    const rankedPolls = [...allPolls]
        .map(poll => ({
            ...poll,
            totalVotes: poll.options.reduce((sum, o) => sum + o.votes, 0)
        }))
        .sort((a, b) => b.totalVotes - a.totalVotes)
        .slice(0, 20);

    const getRankStyle = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
        if (rank === 2) return 'bg-gradient-to-r from-slate-300 to-slate-400 text-white';
        if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white';
        return 'bg-slate-100 text-slate-600';
    };

    const getRankIcon = (rank: number) => {
        if (rank <= 3) return <Trophy className="w-4 h-4" />;
        return null;
    };

    return (
        <div className="container-responsive py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </span>
                    人気ランキング
                </h1>
                <p className="text-slate-500 mt-2">投票数が多い人気のお題TOP20</p>
            </div>

            {/* Ranking List */}
            <div className="space-y-3">
                {rankedPolls.map((poll, index) => {
                    const rank = index + 1;
                    return (
                        <Link
                            key={poll.id}
                            href={`/poll/${poll.id}`}
                            className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group"
                        >
                            {/* Rank Badge */}
                            <div className={cn(
                                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm",
                                getRankStyle(rank)
                            )}>
                                {getRankIcon(rank) || rank}
                            </div>

                            {/* Poll Info */}
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {poll.genre}
                                </span>
                                <h2 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                                    {poll.title}
                                </h2>
                            </div>

                            {/* Vote Count */}
                            <div className="flex-shrink-0 text-right">
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Flame className="w-4 h-4" />
                                    <span className="text-lg font-black">{poll.totalVotes}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold">票</span>
                            </div>
                        </Link>
                    );
                })}

                {rankedPolls.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">まだお題がありません</p>
                    </div>
                )}
            </div>
        </div>
    );
}
