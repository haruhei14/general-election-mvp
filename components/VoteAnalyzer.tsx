'use client';

import { Sparkles, Brain, BarChart3, Quote, Trophy, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VoteAnalyzer({ history }: { history: any[] }) {
    // Collect genre counts
    const genreMap: Record<string, number> = {};
    history.forEach(item => {
        genreMap[item.genre] = (genreMap[item.genre] || 0) + 1;
    });

    const totalVotes = history.length;
    const sortedGenres = Object.entries(genreMap).sort((a, b) => b[1] - a[1]);
    const topGenre = sortedGenres[0]?.[0] || 'なし';

    // Majority Match Rate (Only for entries that have the 'isMajority' flag)
    const majorityHistory = history.filter(h => h.isMajority !== undefined);
    const majorityMatches = majorityHistory.filter(h => h.isMajority).length;
    const matchRate = majorityHistory.length > 0
        ? Math.round((majorityMatches / majorityHistory.length) * 100)
        : 0;

    // Personality Summary
    const getSummary = () => {
        if (totalVotes < 3) return {
            title: "分析の卵",
            desc: "まだ始まったばかりです。投票を重ねることで、あなたの感性が地図になっていきます。",
            badge: "新人観測者",
            color: "from-slate-400 to-slate-500"
        };

        if (topGenre === "価値観" || topGenre === "究極の選択") {
            return {
                title: "深層を思索する智者",
                desc: "物事の表面的な部分よりも、その背後にある真意や倫理、可能性を重んじる哲学的感性をお持ちです。",
                badge: "思索のマスター",
                color: "from-indigo-600 to-violet-700"
            };
        }

        if (topGenre === "日常・生活" || topGenre === "食べ物") {
            return {
                title: "今を慈しむ実力派",
                desc: "地に足の着いた感覚を持ち、日々の小さなしあわせを大切にする、非常に安定した審美眼の持ち主です。",
                badge: "生活の達人",
                color: "from-emerald-600 to-teal-700"
            };
        }

        if (topGenre === "テクノロジー" || topGenre === "仕事・学び") {
            return {
                title: "未来展望の先駆者",
                desc: "進化や知識のアップデートに積極的で、合理性と新しさを愛するイノベーティブな精神の持ち主です。",
                badge: "ナレッジリーダー",
                color: "from-cyan-600 to-blue-700"
            };
        }

        return {
            title: "境界を超えゆく自由人",
            desc: "一つの価値観に縛られず、あらゆるジャンルをフラットに楽しめる多層的な視点を持っています。",
            badge: "万能の観測者",
            color: "from-fuchsia-600 to-pink-700"
        };
    };

    const summary = getSummary();

    return (
        <div className="space-y-8">
            {/* Main Personality Card */}
            <div className={cn(
                "relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl bg-gradient-to-br",
                summary.color
            )}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-20 -mb-20" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Analysis Result
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
                            {summary.title}
                        </h2>
                        <div className="flex items-center gap-3 text-white/90 font-bold mb-6">
                            <Brain className="w-5 h-5 opacity-80" />
                            タイプ：{summary.badge}
                        </div>
                        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 italic text-white/95 leading-relaxed md:text-lg">
                            <Quote className="w-6 h-6 mb-2 opacity-30" />
                            「{summary.desc}」
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-between h-32 shadow-xl">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        Total Votes
                    </div>
                    <div className="text-4xl font-black">{totalVotes} <span className="text-sm font-normal text-slate-400">票</span></div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl flex flex-col justify-between h-32">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <TrendingUp className="w-3 h-3" />
                        Most Voted
                    </div>
                    <div className="text-2xl font-black text-slate-800 truncate">{topGenre}</div>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-3xl flex flex-col justify-between h-32 shadow-xl">
                    <div className="flex items-center gap-2 text-blue-200 text-[10px] font-black uppercase tracking-widest">
                        <Target className="w-3 h-3" />
                        Majority Match
                    </div>
                    <div className="text-4xl font-black">{matchRate}%</div>
                </div>
            </div>

            {/* Genre Distribution (Horizontal Bars) */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
                <h3 className="font-black text-slate-800 mb-8 flex items-center gap-3 text-xl">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                    関心ジャンルの分布
                </h3>

                <div className="space-y-6">
                    {sortedGenres.map(([name, value], idx) => {
                        const percent = Math.round((value / totalVotes) * 100);
                        return (
                            <div key={name} className="space-y-2">
                                <div className="flex justify-between items-end text-sm">
                                    <span className="font-bold text-slate-700">{name}</span>
                                    <span className="font-black italic text-slate-900">{percent}% <span className="text-[10px] font-normal not-italic text-slate-400">({value}票)</span></span>
                                </div>
                                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000 ease-out",
                                            idx === 0 ? "bg-blue-600" : "bg-slate-300"
                                        )}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
