'use client';

import { Poll } from '@/lib/data';
import Link from 'next/link';
import { submitVote } from '@/lib/actions';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check, ArrowRight } from 'lucide-react';

// Count-up animation hook
function useCountUp(end: number, duration: number = 600, shouldStart: boolean = false) {
    const [count, setCount] = useState(0);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        if (!shouldStart) return;

        const animate = (timestamp: number) => {
            if (!startRef.current) startRef.current = timestamp;
            const progress = Math.min((timestamp - startRef.current) / duration, 1);
            setCount(Math.round(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration, shouldStart]);

    return count;
}

// Mini summary generator
function getMiniSummary(options: { votes: number }[], totalVotes: number): string {
    if (totalVotes < 5) return 'まだ投票が集まり始めたばかり';

    const percentages = options.map(o => totalVotes > 0 ? (o.votes / totalVotes) * 100 : 0);
    const maxPercent = Math.max(...percentages);
    const minPercent = Math.min(...percentages);

    if (maxPercent - minPercent < 15) return '意見が割れやすいお題みたい';
    if (maxPercent > 60) return 'かなり票が集まっているね';
    return 'いい勝負になっているね';
}

// Share Button Component
function ShareButton({ poll, votedOptionId }: { poll: Poll; votedOptionId: string | null }) {
    const selectedOption = poll.options.find(o => o.id === votedOptionId);
    const optionLabel = selectedOption?.label || '';

    const shareText = `「${poll.title}」\n私は「${optionLabel}」派でした！\nあなたはどっち？`;
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/poll/${poll.id}`
        : '';

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\n#なんでも総選挙')}&url=${encodeURIComponent(shareUrl)}`;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

    return (
        <div className="flex gap-2 mb-3">
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
            </a>
            <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:brightness-110 transition-all active:scale-[0.98]"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE
            </a>
        </div>
    );
}

export function PollCard({ poll, hideOptions = false, hideNextButton = false }: { poll: Poll, hideOptions?: boolean, hideNextButton?: boolean }) {
    const [hasVoted, setHasVoted] = useState(false);
    const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [justVoted, setJustVoted] = useState(false);
    const [animatedOptionId, setAnimatedOptionId] = useState<string | null>(null);
    const [updatedOptions, setUpdatedOptions] = useState(poll.options);

    // Total votes calculation
    const totalVotes = updatedOptions.reduce((acc, curr) => acc + curr.votes, 0);

    useEffect(() => {
        const voted = localStorage.getItem(`vote_${poll.id}`);
        if (voted) {
            setHasVoted(true);
            setVotedOptionId(voted);
        }
    }, [poll.id]);

    const handleVote = async (optionId: string) => {
        if (hasVoted || isPending) return;

        // Trigger scale animation
        setAnimatedOptionId(optionId);
        setTimeout(() => setAnimatedOptionId(null), 300);

        setIsPending(true);
        try {
            await submitVote(poll.id, optionId);

            // Update local options with incremented vote
            const newOptions = updatedOptions.map(o =>
                o.id === optionId ? { ...o, votes: o.votes + 1 } : o
            );
            setUpdatedOptions(newOptions);

            // Save vote state
            localStorage.setItem(`vote_${poll.id}`, optionId);

            // Append to history for /my-votes
            const historyJson = localStorage.getItem('vote_history');
            const history = historyJson ? JSON.parse(historyJson) : [];
            const selectedOption = newOptions.find(o => o.id === optionId);
            const newTotal = newOptions.reduce((acc, o) => acc + o.votes, 0);
            const selectedVotes = selectedOption?.votes || 0;
            const isMajority = (selectedVotes / newTotal) >= 0.5;

            const newEntry = {
                pollId: poll.id,
                pollTitle: poll.title,
                genre: poll.genre,
                optionId: optionId,
                optionLabel: selectedOption?.label || 'Unknown',
                timestamp: new Date().toISOString(),
                isMajority: isMajority
            };

            const filteredHistory = history.filter((h: any) => h.pollId !== poll.id);
            localStorage.setItem('vote_history', JSON.stringify([newEntry, ...filteredHistory]));

            setHasVoted(true);
            setVotedOptionId(optionId);
            setJustVoted(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="card-premium p-0 flex flex-col bg-white overflow-hidden relative group/card">
            <div className="p-6 flex flex-col relative z-10">
                {/* Genre Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        {poll.genre}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 leading-snug">
                    {poll.title}
                </h3>

                {/* Options */}
                {hideOptions && !hasVoted ? (
                    <div className="mt-auto">
                        <Link
                            href={`/poll/${poll.id}`}
                            className="w-full btn-gradient py-3 rounded-xl font-bold flex items-center justify-center gap-2 group/btn"
                        >
                            <span>投票へ進む</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {updatedOptions.map((option) => {
                            const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                            const isSelected = votedOptionId === option.id;
                            const showResult = hasVoted;
                            const isAnimating = animatedOptionId === option.id;

                            return (
                                <OptionButton
                                    key={option.id}
                                    option={option}
                                    percent={percent}
                                    isSelected={isSelected}
                                    showResult={showResult}
                                    isAnimating={isAnimating}
                                    hasVoted={hasVoted}
                                    justVoted={justVoted}
                                    onClick={() => handleVote(option.id)}
                                    totalVotes={totalVotes}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Post-vote Summary */}
                {hasVoted && (
                    <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Mini Summary */}
                        <p className="text-center text-sm text-slate-500 italic mb-4">
                            💡 {getMiniSummary(updatedOptions, totalVotes)}
                        </p>

                        {/* Total Votes */}
                        <div className="text-center text-slate-400 text-xs font-bold mb-4">
                            総投票数: {totalVotes}票
                        </div>

                        {/* Share Button */}
                        <ShareButton poll={poll} votedOptionId={votedOptionId} />

                        {/* Next Poll Button */}
                        {!hideNextButton && (
                            <Link
                                href="/api/poll/random"
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-black text-base hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg mt-3"
                            >
                                次のお題へ
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Separate component for option button with animations
function OptionButton({
    option,
    percent,
    isSelected,
    showResult,
    isAnimating,
    hasVoted,
    justVoted,
    onClick,
    totalVotes
}: {
    option: { id: string; label: string; votes: number };
    percent: number;
    isSelected: boolean;
    showResult: boolean;
    isAnimating: boolean;
    hasVoted: boolean;
    justVoted: boolean;
    onClick: () => void;
    totalVotes: number;
}) {
    const animatedPercent = useCountUp(percent, 600, justVoted && showResult);
    const displayPercent = justVoted ? animatedPercent : percent;

    // Majority/Minority labels
    const isMajority = percent >= 60;
    const isMinority = percent < 40 && percent > 0;

    return (
        <button
            onClick={onClick}
            disabled={hasVoted}
            className={cn(
                "relative w-full text-left p-4 rounded-xl border-2 transition-all overflow-hidden",
                isAnimating && "scale-[1.04]",
                hasVoted
                    ? isSelected
                        ? "border-blue-400 bg-blue-50/50"
                        : "border-slate-100 bg-slate-50/30"
                    : "border-slate-200 hover:border-blue-400 hover:shadow-lg cursor-pointer active:scale-[0.98]",
                "duration-300"
            )}
        >
            {/* Progress Bar Background */}
            {showResult && (
                <div
                    className={cn(
                        "absolute top-0 left-0 h-full transition-all duration-700 ease-out",
                        isSelected
                            ? "bg-gradient-to-r from-blue-200/60 to-blue-100/40"
                            : "bg-slate-100/60"
                    )}
                    style={{ width: justVoted ? `${animatedPercent}%` : `${percent}%` }}
                />
            )}

            <div className="relative z-10 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {isSelected && (
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                    )}
                    <span className={cn(
                        "truncate",
                        isSelected ? "text-blue-700 font-bold" : "text-slate-700 font-medium"
                    )}>
                        {option.label}
                    </span>
                </div>

                {showResult && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Majority/Minority Label */}
                        {isSelected && isMajority && (
                            <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full animate-in slide-in-from-right duration-500">
                                多数派！
                            </span>
                        )}
                        {isSelected && isMinority && (
                            <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full animate-in slide-in-from-right duration-500">
                                少数派かも？
                            </span>
                        )}
                        <span className={cn(
                            "text-lg font-black tabular-nums",
                            isSelected ? "text-blue-600" : "text-slate-500"
                        )}>
                            {displayPercent}%
                        </span>
                    </div>
                )}
            </div>
        </button>
    );
}
