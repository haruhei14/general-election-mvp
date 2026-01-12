'use client';

import { useEffect, useState } from 'react';
import { Award, Target, Trophy, ArrowLeft, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const RANKS = [
    { threshold: 0, label: '卵', description: 'まだ選挙の卵です。これからたくさんの総選挙に参加しましょう！', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' },
    { threshold: 1, label: '選挙の卵', description: '最初の一歩を踏み出しました！あなたは立派な有権者です。', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { threshold: 5, label: '常連投票者', description: '総選挙の常連になってきました。あなたの意見が世論を作ります。', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { threshold: 10, label: '総選挙マニア', description: 'あなたはもう総選挙マニアです。あらゆるジャンルに精通しています。', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { threshold: 25, label: '選挙マスター', description: '圧倒的な投票数！あなたの行動力は伝説級です。', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { threshold: 50, label: '総選挙の守護神', description: '総選挙そのものを支える存在。もはや神の領域です。', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
];

export default function AchievementsPage() {
    const [voteCount, setVoteCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateCount = () => {
            let count = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('vote_')) {
                    count++;
                }
            }
            setVoteCount(count);
        };
        updateCount();
    }, []);

    if (!isMounted) return null;

    const currentRankIdx = [...RANKS].reverse().findIndex(r => voteCount >= r.threshold);
    const currentRank = RANKS[RANKS.length - 1 - currentRankIdx] || RANKS[0];
    const nextRank = RANKS.find(r => r.threshold > voteCount);

    const progress = nextRank
        ? ((voteCount - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100
        : 100;

    return (
        <div className="container-responsive py-12 space-y-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
                        <span className="p-2.5 bg-yellow-100 text-yellow-600 rounded-2xl">
                            <Trophy className="w-8 h-8" />
                        </span>
                        ランク・実績
                    </h1>
                    <p className="text-slate-500 mt-2">あなたの活動状況と、これからの目標を確認しましょう。</p>
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-all shadow-sm self-start md:self-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    ホームへ戻る
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content (Left) */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Current Status Card */}
                    <div className={cn(
                        "relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border-2 shadow-2xl transition-all duration-500",
                        currentRank.bg,
                        currentRank.border
                    )}>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse" />
                                <div className={cn(
                                    "relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-white shadow-xl border-4",
                                    currentRank.border
                                )}>
                                    <Award className={cn("w-16 h-16 md:w-20 md:h-20", currentRank.color)} />
                                </div>
                            </div>

                            <div className="text-center md:text-left space-y-4 flex-grow">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    Current Status
                                </div>
                                <h2 className={cn("text-4xl md:text-6xl font-black italic", currentRank.color)}>
                                    {currentRank.label}
                                </h2>
                                <p className="text-slate-600 font-medium md:text-lg max-w-md">
                                    {currentRank.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Card */}
                    {nextRank && (
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-lg space-y-8">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <Target className="w-6 h-6 text-blue-500" />
                                次のランクまで
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Current Progress</p>
                                        <div className="text-3xl font-black text-slate-800">
                                            あと <span className="text-blue-600">{nextRank.threshold - voteCount}</span> 投票
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-800">{nextRank.label}</p>
                                        <p className="text-xs text-slate-400 font-medium">Goal: {nextRank.threshold} 投票</p>
                                    </div>
                                </div>

                                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                        <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <p className="text-sm text-blue-700 font-medium">
                                        新しいランクに上がると、称号が新しくなり、マイレポートの分析がより精密になります！
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Rank List (Right) */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
                        ランク一覧
                    </h3>
                    <div className="space-y-3">
                        {RANKS.map((r, idx) => {
                            const isReached = voteCount >= r.threshold;
                            const isCurrent = currentRank.label === r.label;

                            return (
                                <div
                                    key={r.label}
                                    className={cn(
                                        "p-4 rounded-2xl border flex items-center justify-between transition-all",
                                        isReached ? "bg-white shadow-sm" : "bg-slate-50 opacity-60 grayscale",
                                        isCurrent ? "border-2 border-blue-500 shadow-md ring-4 ring-blue-50" : "border-slate-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            isReached ? r.bg : "bg-slate-200"
                                        )}>
                                            <Award className={cn("w-5 h-5", isReached ? r.color : "text-slate-400")} />
                                        </div>
                                        <div>
                                            <p className={cn("font-bold text-sm", isReached ? "text-slate-800" : "text-slate-400")}>
                                                {r.label}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-medium">
                                                {r.threshold} 投票以上
                                            </p>
                                        </div>
                                    </div>
                                    {isCurrent && (
                                        <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                            Current
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
