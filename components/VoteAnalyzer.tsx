'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sparkles, Brain, BarChart3, Quote } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#f43f5e', '#14b8a6'];

export function VoteAnalyzer({ history }: { history: any[] }) {
    // Collect genre counts
    const genreMap: Record<string, number> = {};
    history.forEach(item => {
        genreMap[item.genre] = (genreMap[item.genre] || 0) + 1;
    });

    const chartData = Object.entries(genreMap).map(([name, value]) => ({ name, value }));

    // Analysis Logic (Personality Summary)
    const getSummary = () => {
        const total = history.length;
        const sortedGenres = Object.entries(genreMap).sort((a, b) => b[1] - a[1]);
        const topGenre = sortedGenres[0]?.[0];

        if (total < 3) return {
            title: "分析開始！",
            desc: "まだ投票数が少ないようです。もっとたくさんのお題に答えることで、あなたの隠れた性格が見えてきます。",
            badge: "新人投票者"
        };

        if (topGenre === "価値観" || topGenre === "究極の選択") {
            return {
                title: "深層を思索する哲学者",
                desc: "人生の意味や重い選択に興味があるようですね。物事の表面だけでなく、本質を見極めようとする思慮深いタイプかもしれません。",
                badge: "思索のマスター"
            };
        }

        if (topGenre === "日常・生活" || topGenre === "食べ物") {
            return {
                title: "今この瞬間を楽しむリアリスト",
                desc: "日々の生活や美味しいものに敏感な、非常に健康的でバランスの取れた感性をお持ちです。周囲を明るくする才能があります。",
                badge: "生活の達人"
            };
        }

        if (topGenre === "テクノロジー" || topGenre === "仕事・学び") {
            return {
                title: "未来を切り拓くイノベーター",
                desc: "新しい知識や効率、進化に対して非常に前向きです。常に一歩先を読み、自分を高めることに喜びを感じるタイプです。",
                badge: "ナレッジリーダー"
            };
        }

        return {
            title: "好奇心旺盛な自由人",
            desc: "特定のジャンルに縛られず、幅広いジャンルに興味があるようですね。多角的な視点を持ち、柔軟な発想ができる魅力的な人物です。",
            badge: "万能の観測者"
        };
    };

    const summary = getSummary();

    return (
        <div className="space-y-10">
            {/* Personality Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl -ml-20 -mb-20" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        Personality Analysis
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                            {summary.title}
                        </h2>
                        <div className="flex items-center gap-3 text-blue-100 font-bold mb-6">
                            <Brain className="w-5 h-5 text-blue-200" />
                            タイプ：{summary.badge}
                        </div>
                        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 italic text-blue-50 leading-relaxed md:text-lg">
                            <Quote className="w-6 h-6 mb-2 opacity-50" />
                            「{summary.desc}」
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Genre Chart */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        関心ジャンルの分布
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {chartData.map((item, idx) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                <span className="truncate">{item.name}</span>
                                <span className="text-slate-400">({item.value})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counter Cards */}
                <div className="space-y-4">
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
                        <span className="text-slate-400 text-xs font-bold uppercase">Total Votes</span>
                        <div className="text-4xl font-black mt-1">{history.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <span className="text-slate-400 text-xs font-bold uppercase">Days Active</span>
                        <div className="text-4xl font-black mt-1 text-slate-800">1</div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                        <p className="text-blue-700 text-sm font-medium leading-relaxed">
                            💡 たくさん投票するほど、AIがあなたの好みをより正確に理解できるようになります！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
