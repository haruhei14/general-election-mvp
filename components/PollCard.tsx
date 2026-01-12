'use client';

import { Poll } from '@/lib/data';
import Link from 'next/link';
import { submitVote } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, Share2, MessageCircle, ArrowRight } from 'lucide-react';

export function PollCard({ poll, hideOptions = false, hideNextButton = false }: { poll: Poll, hideOptions?: boolean, hideNextButton?: boolean }) {
    const [hasVoted, setHasVoted] = useState(false);
    const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    // Total votes calculation
    const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);

    useEffect(() => {
        const voted = localStorage.getItem(`vote_${poll.id}`);
        if (voted) {
            setHasVoted(true);
            setVotedOptionId(voted);
        }
    }, [poll.id]);

    const handleVote = async (optionId: string) => {
        if (hasVoted || isPending) return;

        setIsPending(true);
        try {
            await submitVote(poll.id, optionId);

            // Save vote state
            localStorage.setItem(`vote_${poll.id}`, optionId);

            // Append to history for /my-votes
            const historyJson = localStorage.getItem('vote_history');
            const history = historyJson ? JSON.parse(historyJson) : [];
            const selectedOption = poll.options.find(o => o.id === optionId);

            const isMajority = selectedOption
                ? (selectedOption.votes + 1) === Math.max(...poll.options.map(o => o.id === optionId ? o.votes + 1 : o.votes))
                : false;

            const newEntry = {
                pollId: poll.id,
                pollTitle: poll.title,
                genre: poll.genre,
                optionId: optionId,
                optionLabel: selectedOption?.label || 'Unknown',
                timestamp: new Date().toISOString(),
                isMajority: isMajority
            };

            // Prevent duplicates and keep latest
            const filteredHistory = history.filter((h: any) => h.pollId !== poll.id);
            localStorage.setItem('vote_history', JSON.stringify([newEntry, ...filteredHistory]));

            setHasVoted(true);
            setVotedOptionId(optionId);
        } catch (e) {
            console.error(e);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="card-premium p-0 flex flex-col h-full bg-white overflow-hidden relative group/card">
            {/* OG Image Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] group-hover/card:opacity-[0.05] transition-opacity duration-500"
                style={{
                    backgroundImage: `url(/og/${poll.id})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="p-6 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        {poll.genre}
                    </span>
                    <span className="text-xs text-slate-400">{new Date(poll.created_at).toLocaleDateString()}</span>
                </div>

                {/* Featured Image Section */}
                {(() => {
                    const genreConfigs: Record<string, { grad: string }> = {
                        "食べ物": { grad: "from-orange-100 to-amber-200" },
                        "日常・生活": { grad: "from-sky-100 to-blue-200" },
                        "価値観": { grad: "from-emerald-100 to-teal-200" },
                        "エンタメ": { grad: "from-purple-100 to-pink-200" },
                        "仕事・学び": { grad: "from-indigo-100 to-slate-200" },
                        "テクノロジー": { grad: "from-cyan-100 to-blue-200" },
                        "人間関係": { grad: "from-rose-100 to-red-200" },
                        "究極の選択": { grad: "from-red-100 to-blue-100" },
                    };

                    const config = genreConfigs[poll.genre] || { grad: "from-slate-50 to-slate-100" };

                    return (
                        <div className={cn(
                            "mb-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm relative aspect-video bg-gradient-to-br",
                            config.grad
                        )}>
                            {poll.image_url ? (
                                <img
                                    src={poll.image_url}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                    <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full" />
                                    <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-black/5 blur-2xl rounded-full" />
                                    <span className="text-4xl font-black uppercase tracking-tighter text-black/5 select-none translate-y-4">
                                        {poll.genre}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })()}

                <Link href={`/poll/${poll.id}`} className="group block mb-4 flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                        {poll.title}
                    </h3>
                    {poll.description && (
                        <p className="text-sm text-slate-500 line-clamp-2">{poll.description}</p>
                    )}
                </Link>

                {(hideOptions && !hasVoted) ? (
                    <div className="mb-6">
                        <Link
                            href={`/poll/${poll.id}`}
                            className="w-full btn-gradient py-3 rounded-xl font-bold flex items-center justify-center gap-2 group/btn"
                        >
                            <span>投票へ進む</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3 mb-6">
                        {poll.options.map((option) => {
                            const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                            const isSelected = votedOptionId === option.id;
                            const showResult = hasVoted;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleVote(option.id)}
                                    disabled={hasVoted}
                                    className={cn(
                                        "relative w-full text-left p-3 rounded-xl border transition-all overflow-hidden group",
                                        hasVoted
                                            ? "border-slate-200 cursor-default"
                                            : "border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer active:scale-[0.99]"
                                    )}
                                >
                                    {/* Progress Bar Background */}
                                    {showResult && (
                                        <div
                                            className={cn(
                                                "absolute top-0 left-0 h-full transition-all duration-1000 ease-out",
                                                isSelected ? "bg-green-100/70" : "bg-slate-100/50"
                                            )}
                                            style={{ width: `${percent}%` }}
                                        />
                                    )}

                                    <div className="relative z-10 flex justify-between items-center">
                                        <span className={cn(
                                            "font-medium",
                                            isSelected ? "text-green-700 font-bold" : "text-slate-700"
                                        )}>
                                            {isSelected && <Check className="inline w-4 h-4 mr-1 -mt-1" />}
                                            {option.label}
                                        </span>
                                        {showResult && (
                                            <span className="text-sm font-bold text-slate-600">
                                                {percent}%
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {hasVoted && !hideNextButton && (
                    <div className="mt-6 pt-6 border-t border-slate-50">
                        <Link
                            href="/api/poll/random"
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-md"
                        >
                            次のお題に進む
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                <div className="flex items-center justify-between text-slate-400 text-sm border-t pt-4 mt-auto">
                    <span className="flex items-center gap-1">
                        {totalVotes} 票
                    </span>
                    <div className="flex gap-4">
                        <Link href={`/poll/${poll.id}`} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>コメント</span>
                        </Link>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
