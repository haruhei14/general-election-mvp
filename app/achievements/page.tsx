'use client';

import { useEffect, useState } from 'react';
import { Award, Target, Trophy, ArrowLeft, Star, TrendingUp, Sparkles, Flame, Zap, Crown, Medal, Heart, Coffee, Gamepad2, Utensils, Users, Brain, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Voting ranks (by total votes)
const RANKS = [
    { threshold: 0, label: '卵', description: 'まだ選挙の卵です。これからたくさんの総選挙に参加しましょう！', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' },
    { threshold: 1, label: '選挙の卵', description: '最初の一歩を踏み出しました！', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { threshold: 5, label: '常連投票者', description: '総選挙の常連になってきました。', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { threshold: 10, label: '総選挙マニア', description: 'あなたはもう総選挙マニアです。', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { threshold: 25, label: '選挙マスター', description: '圧倒的な投票数！', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { threshold: 50, label: '総選挙の達人', description: '達人の域に到達しました。', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { threshold: 100, label: '選挙の王', description: '王者の貫禄があります。', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    { threshold: 200, label: '伝説の投票者', description: '伝説級の投票数です。', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { threshold: 500, label: '総選挙の神', description: '神の領域に到達しました。', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
];

// Special achievements/badges
const BADGES = [
    // 投票数系
    { id: 'first-vote', label: '初投票', description: '初めて投票した', icon: Sparkles, condition: (stats: Stats) => stats.totalVotes >= 1, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'vote-5', label: '5票達成', description: '5回投票した', icon: Star, condition: (stats: Stats) => stats.totalVotes >= 5, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 'vote-10', label: '10票達成', description: '10回投票した', icon: Medal, condition: (stats: Stats) => stats.totalVotes >= 10, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'vote-25', label: '25票達成', description: '25回投票した', icon: Trophy, condition: (stats: Stats) => stats.totalVotes >= 25, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'vote-50', label: '50票達成', description: '50回投票した', icon: Crown, condition: (stats: Stats) => stats.totalVotes >= 50, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'vote-100', label: '100票達成', description: '100回投票した', icon: Zap, condition: (stats: Stats) => stats.totalVotes >= 100, color: 'text-amber-500', bg: 'bg-amber-50' },

    // ジャンル系
    { id: 'food-lover', label: 'グルメ投票家', description: '食べ物ジャンルに5回投票', icon: Utensils, condition: (stats: Stats) => (stats.genreCounts['食べ物'] || 0) >= 5, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'entertainment-fan', label: 'エンタメ通', description: 'エンタメジャンルに5回投票', icon: Gamepad2, condition: (stats: Stats) => (stats.genreCounts['エンタメ'] || 0) >= 5, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'work-expert', label: '社会人の達人', description: '仕事系ジャンルに5回投票', icon: Coffee, condition: (stats: Stats) => (stats.genreCounts['仕事・社会人'] || 0) + (stats.genreCounts['仕事・学び'] || 0) >= 5, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'lifestyle-guru', label: '日常マスター', description: '日常系ジャンルに5回投票', icon: Heart, condition: (stats: Stats) => (stats.genreCounts['日常・価値観'] || 0) + (stats.genreCounts['日常・生活'] || 0) >= 5, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'relationship-pro', label: '人間関係の達人', description: '人間関係ジャンルに5回投票', icon: Users, condition: (stats: Stats) => (stats.genreCounts['人間関係'] || 0) >= 5, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'thinker', label: '哲学者', description: '価値観ジャンルに5回投票', icon: Brain, condition: (stats: Stats) => (stats.genreCounts['価値観'] || 0) >= 5, color: 'text-violet-500', bg: 'bg-violet-50' },

    // 特殊系
    { id: 'majority-5', label: 'トレンドリーダー', description: '5回多数派になった', icon: TrendingUp, condition: (stats: Stats) => stats.majorityCount >= 5, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'majority-10', label: '世論の代弁者', description: '10回多数派になった', icon: TrendingUp, condition: (stats: Stats) => stats.majorityCount >= 10, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'minority-5', label: '独自路線派', description: '5回少数派になった', icon: Flame, condition: (stats: Stats) => stats.minorityCount >= 5, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'minority-10', label: '逆張りマスター', description: '10回少数派になった', icon: Flame, condition: (stats: Stats) => stats.minorityCount >= 10, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'genre-3', label: 'ジャンル探検家', description: '3つ以上のジャンルに投票', icon: Star, condition: (stats: Stats) => Object.keys(stats.genreCounts).length >= 3, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { id: 'genre-5', label: 'ジャンルマスター', description: '5つ以上のジャンルに投票', icon: Crown, condition: (stats: Stats) => Object.keys(stats.genreCounts).length >= 5, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'all-rounder', label: 'オールラウンダー', description: '全ジャンルに投票した', icon: Trophy, condition: (stats: Stats) => Object.keys(stats.genreCounts).length >= 8, color: 'text-amber-500', bg: 'bg-amber-50' },
];

type Stats = {
    totalVotes: number;
    majorityCount: number;
    minorityCount: number;
    genreCounts: Record<string, number>;
};

export default function AchievementsPage() {
    const [voteCount, setVoteCount] = useState(0);
    const [stats, setStats] = useState<Stats>({
        totalVotes: 0,
        majorityCount: 0,
        minorityCount: 0,
        genreCounts: {}
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Count votes
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('vote_')) {
                count++;
            }
        }
        setVoteCount(count);

        // Get vote history for detailed stats
        const historyJson = localStorage.getItem('vote_history');
        const history = historyJson ? JSON.parse(historyJson) : [];

        let majorityCount = 0;
        let minorityCount = 0;
        const genreCounts: Record<string, number> = {};

        history.forEach((vote: any) => {
            if (vote.isMajority) majorityCount++;
            else minorityCount++;

            if (vote.genre) {
                genreCounts[vote.genre] = (genreCounts[vote.genre] || 0) + 1;
            }
        });

        setStats({
            totalVotes: count,
            majorityCount,
            minorityCount,
            genreCounts
        });
    }, []);

    if (!isMounted) return null;

    const currentRankIdx = [...RANKS].reverse().findIndex(r => voteCount >= r.threshold);
    const currentRank = RANKS[RANKS.length - 1 - currentRankIdx] || RANKS[0];
    const nextRank = RANKS.find(r => r.threshold > voteCount);

    const progress = nextRank
        ? ((voteCount - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100
        : 100;

    const earnedBadges = BADGES.filter(b => b.condition(stats));
    const lockedBadges = BADGES.filter(b => !b.condition(stats));

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
                    <p className="text-slate-500 mt-2">あなたの活動状況と獲得した称号を確認しましょう。</p>
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
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-lg space-y-6">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <Target className="w-6 h-6 text-blue-500" />
                                次のランクまで
                            </h3>

                            <div className="flex justify-between items-end mb-2">
                                <div className="text-3xl font-black text-slate-800">
                                    あと <span className="text-blue-600">{nextRank.threshold - voteCount}</span> 投票
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-800">{nextRank.label}</p>
                                </div>
                            </div>

                            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Earned Badges */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-lg space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            獲得した称号 ({earnedBadges.length}/{BADGES.length})
                        </h3>

                        {earnedBadges.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {earnedBadges.map(badge => (
                                    <div
                                        key={badge.id}
                                        className={cn(
                                            "p-4 rounded-2xl border-2 border-dashed flex flex-col items-center text-center gap-2",
                                            badge.bg, "border-current"
                                        )}
                                    >
                                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", badge.bg)}>
                                            <badge.icon className={cn("w-6 h-6", badge.color)} />
                                        </div>
                                        <p className={cn("font-bold text-sm", badge.color)}>{badge.label}</p>
                                        <p className="text-[10px] text-slate-400">{badge.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-center py-8">まだ称号を獲得していません。投票して称号をゲットしよう！</p>
                        )}
                    </div>

                    {/* Locked Badges */}
                    {lockedBadges.length > 0 && (
                        <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 space-y-6">
                            <h3 className="text-xl font-bold text-slate-400 flex items-center gap-3">
                                <Lock className="w-6 h-6" />
                                未獲得の称号 ({lockedBadges.length})
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {lockedBadges.map(badge => (
                                    <div
                                        key={badge.id}
                                        className="p-3 rounded-xl bg-white/50 border border-slate-200 flex flex-col items-center text-center gap-2 opacity-50 grayscale"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <p className="font-bold text-xs text-slate-400">{badge.label}</p>
                                        <p className="text-[9px] text-slate-300">{badge.description}</p>
                                    </div>
                                ))}
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
                        {RANKS.map((r) => {
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
