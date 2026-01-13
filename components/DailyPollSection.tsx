'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poll } from '@/lib/data';
import { submitVote } from '@/lib/actions';
import { Calendar, ChevronDown, Vote, Check, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DailyPollSection({ poll }: { poll: Poll }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
    const [isVoting, setIsVoting] = useState(false);
    const [localPoll, setLocalPoll] = useState(poll);

    // Check if already voted
    useEffect(() => {
        const saved = localStorage.getItem(`vote_${poll.id}`);
        if (saved) {
            setHasVoted(true);
            setVotedOptionId(saved);
        }
    }, [poll.id]);

    const handleVote = async (optionId: string) => {
        if (hasVoted || isVoting) return;

        setIsVoting(true);
        try {
            await submitVote(poll.id, optionId);

            // Update local state
            localStorage.setItem(`vote_${poll.id}`, optionId);
            setVotedOptionId(optionId);
            setHasVoted(true);

            // Update local poll votes for display
            setLocalPoll(prev => ({
                ...prev,
                options: prev.options.map(opt =>
                    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                )
            }));
        } finally {
            setIsVoting(false);
        }
    };

    const totalVotes = localPoll.options.reduce((sum, o) => sum + o.votes, 0);
    const getPercentage = (votes: number) => totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Header - クリックでアコーディオン開閉 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 md:p-6 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
            >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow min-w-0">
                    <p className="text-blue-600 text-xs font-bold mb-1">📅 今日の一問</p>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 leading-snug">
                        {poll.title}
                    </h3>
                </div>
                <div className={cn(
                    "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform flex-shrink-0",
                    isOpen && "rotate-180"
                )}>
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                </div>
            </button>

            {/* 展開コンテンツ - 投票可能 */}
            {isOpen && (
                <div className="px-5 md:px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-slate-100 pt-5">
                        {!hasVoted ? (
                            <>
                                <p className="text-slate-500 text-sm mb-4">
                                    選択肢をタップして投票しよう！
                                </p>

                                {/* 投票選択肢 */}
                                <div className="space-y-2">
                                    {localPoll.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleVote(option.id)}
                                            disabled={isVoting}
                                            className="w-full p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-300 rounded-xl text-left font-bold text-slate-700 hover:text-blue-700 transition-all disabled:opacity-50 flex items-center gap-3"
                                        >
                                            <Vote className="w-5 h-5 text-slate-400" />
                                            <span className="flex-grow">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-green-600 text-sm font-bold mb-4 flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    投票完了！結果はこちら
                                </p>

                                {/* 結果表示 */}
                                <div className="space-y-3 mb-6">
                                    {localPoll.options.map((option) => {
                                        const percentage = getPercentage(option.votes);
                                        const isSelected = option.id === votedOptionId;

                                        return (
                                            <div
                                                key={option.id}
                                                className={cn(
                                                    "relative rounded-xl overflow-hidden p-4",
                                                    isSelected ? "bg-blue-50 border-2 border-blue-300" : "bg-slate-50 border border-slate-100"
                                                )}
                                            >
                                                {/* Progress bar */}
                                                <div
                                                    className={cn(
                                                        "absolute inset-0 transition-all duration-500",
                                                        isSelected ? "bg-blue-100" : "bg-slate-100"
                                                    )}
                                                    style={{ width: `${percentage}%` }}
                                                />

                                                <div className="relative flex items-center justify-between">
                                                    <span className={cn(
                                                        "font-bold text-sm",
                                                        isSelected ? "text-blue-700" : "text-slate-700"
                                                    )}>
                                                        {isSelected && <Check className="w-4 h-4 inline mr-2" />}
                                                        {option.label}
                                                    </span>
                                                    <span className={cn(
                                                        "font-black text-lg",
                                                        isSelected ? "text-blue-600" : "text-slate-500"
                                                    )}>
                                                        {percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="text-slate-400 text-xs text-center mb-4">
                                    総投票数: {totalVotes}票
                                </p>

                                {/* 詳細ページへ */}
                                <Link
                                    href={`/poll/${localPoll.id}`}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                                >
                                    <BarChart2 className="w-4 h-4" />
                                    詳細・コメントを見る
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
