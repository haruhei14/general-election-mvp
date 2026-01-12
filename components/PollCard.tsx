'use client';

import { Poll } from '@/lib/data';
import Link from 'next/link';
import { submitVote } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, Share2, MessageCircle } from 'lucide-react';

export function PollCard({ poll }: { poll: Poll }) {
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
            localStorage.setItem(`vote_${poll.id}`, optionId);
            setHasVoted(true);
            setVotedOptionId(optionId);
        } catch (e) {
            console.error(e);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="card-premium p-6 flex flex-col h-full bg-white">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                    {poll.genre}
                </span>
                <span className="text-xs text-slate-400">{new Date(poll.created_at).toLocaleDateString()}</span>
            </div>

            <Link href={`/poll/${poll.id}`} className="group block mb-4 flex-grow">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                    {poll.title}
                </h3>
                {poll.description && (
                    <p className="text-sm text-slate-500 line-clamp-2">{poll.description}</p>
                )}
            </Link>

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
    );
}
