'use client';

import { Poll } from '@/lib/data';
import Link from 'next/link';
import { submitVote } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, Share2, MessageCircle, ArrowRight } from 'lucide-react';

export function PollCard({ poll, hideOptions = false }: { poll: Poll, hideOptions?: boolean }) {
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

            const newEntry = {
                pollId: poll.id,
                pollTitle: poll.title,
                genre: poll.genre,
                optionLabel: selectedOption?.label || 'Unknown',
                timestamp: new Date().toISOString()
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
                    const genreConfigs: Record<string, { pos: string; grad: string }> = {
                        "食べ物": { pos: "0% 0%", grad: "from-orange-50 to-orange-100" },
                        "日常・生活": { pos: "33.33% 0%", grad: "from-blue-50 to-blue-100" },
                        "価値観": { pos: "66.66% 0%", grad: "from-amber-50 to-amber-100" },
                        "エンタメ": { pos: "100% 0%", grad: "from-purple-50 to-purple-100" },
                        "仕事・学び": { pos: "0% 100%", grad: "from-teal-50 to-teal-100" },
                        "テクノロジー": { pos: "33.33% 100%", grad: "from-slate-100 to-slate-200" },
                        "人間関係": { pos: "66.66% 100%", grad: "from-pink-50 to-pink-100" },
                        "究極の選択": { pos: "100% 100%", grad: "from-red-50 to-blue-50" },
                    };

                    const config = genreConfigs[poll.genre] || { pos: "0% 0%", grad: "from-slate-50 to-slate-100" };

                    return (
                        <div className={cn(
                            "mb-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm relative aspect-video bg-gradient-to-br",
                            config.grad
                        )}>
                            {poll.image_url ? (
                                <img
                                    src={poll.image_url}
                                    alt={poll.title}
                                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-no-repeat group-hover/card:scale-110 transition-transform duration-700"
                                    style={{
                                        backgroundImage: 'url(/genres-sprite.png)',
                                        backgroundSize: '400% 200%',
                                        backgroundPosition: config.pos,
                                    }}
                                />
                            )}
                            {!poll.image_url && !config.pos && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <span className="text-4xl font-black uppercase tracking-tighter text-slate-900/10">VOTE</span>
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
