'use client';

import { Poll, Comment } from '@/lib/data';
import { PollCard } from './PollCard';
import { VoteVisualization } from './VoteChart';
import { CommentSection } from './CommentSection';
import { useState, useEffect } from 'react';
import { Shuffle, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ChallengeMode({ initialPolls }: { initialPolls: Poll[] }) {
    const [candidatePolls, setCandidatePolls] = useState<Poll[]>(initialPolls);
    const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVoted, setIsVoted] = useState(false);
    const [votedPollId, setVotedPollId] = useState<string | null>(null);
    const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

    // Pick a random poll on mount or from localStorage
    useEffect(() => {
        const lastVotedId = localStorage.getItem('challenge_last_voted_id');
        const savedPollData = localStorage.getItem('challenge_current_poll');

        if (savedPollData) {
            const saved = JSON.parse(savedPollData);
            setCurrentPoll(saved);
            if (lastVotedId === saved.id) {
                setIsVoted(true);
                setVotedPollId(lastVotedId);
                const savedOptionId = localStorage.getItem(`vote_${saved.id}`);
                setVotedOptionId(savedOptionId);
                fetchComments(saved.id);
            }
        } else if (candidatePolls.length > 0) {
            const random = candidatePolls[Math.floor(Math.random() * candidatePolls.length)];
            setCurrentPoll(random);
            localStorage.setItem('challenge_current_poll', JSON.stringify(random));
        }
        setIsLoading(false);
    }, [candidatePolls]);

    const fetchComments = async (pollId: string) => {
        try {
            const res = await fetch(`/api/comments/${pollId}`);
            const data = await res.json();
            setComments(data.comments || []);
        } catch (e) {
            console.error('Failed to fetch comments', e);
        }
    };

    const handleNext = () => {
        setIsLoading(true);
        setIsVoted(false);
        setComments([]);
        const nextPoll = initialPolls[Math.floor(Math.random() * initialPolls.length)];
        setCurrentPoll(nextPoll);
        localStorage.setItem('challenge_current_poll', JSON.stringify(nextPoll));
        setIsLoading(false);
    };

    // Listen to local storage changes to sync "voted" state across the card component
    useEffect(() => {
        if (!currentPoll) return;
        const checkVote = () => {
            const votedInCard = localStorage.getItem(`vote_${currentPoll.id}`);
            if (votedInCard && !isVoted) {
                setIsVoted(true);
                setVotedPollId(currentPoll.id);
                setVotedOptionId(votedInCard);
                localStorage.setItem('challenge_last_voted_id', currentPoll.id);
                fetchComments(currentPoll.id);
            }
        };
        const interval = setInterval(checkVote, 1000);
        return () => clearInterval(interval);
    }, [currentPoll, isVoted]);

    if (isLoading || !currentPoll) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">お題を選んでいます...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header: Always show context or specific title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-purple-100 text-purple-600 rounded-xl flex-shrink-0">
                        <Shuffle className="w-5 h-5" />
                    </span>
                    <span className="truncate">
                        {isVoted ? `投票済み：${currentPoll.title}` : 'ランダム総選挙'}
                    </span>
                </h2>
            </div>

            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            )}>
                {/* Left Side: Poll Card / Visual Context */}
                <div className={cn(
                    "lg:col-span-12 xl:col-span-4",
                    !isVoted && "max-w-2xl mx-auto w-full"
                )}>
                    <PollCard key={currentPoll.id} poll={currentPoll} hideNextButton={true} />
                </div>

                {/* Right Side: Results & Comments (only if voted) */}
                {isVoted && (
                    <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-700">
                        {/* Results Column */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -z-0" />
                                <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                    投票結果
                                </h4>
                                <div className="relative z-10">
                                    <VoteVisualization
                                        pollId={currentPoll.id}
                                        initialOptions={currentPoll.options}
                                        votedOptionId={votedOptionId}
                                        hideNextButton={true}
                                    />
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center relative z-10">
                                    <a
                                        href="#reasons"
                                        className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group"
                                    >
                                        みんなの「理由」を見る
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Comments Column */}
                        <div id="reasons" className="animate-in slide-in-from-bottom-4 duration-1000">
                            <CommentSection pollId={currentPoll.id} comments={comments} />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation Buttons (after voting) */}
            {isVoted && (
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100">
                    <Link
                        href="/my-votes"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-extrabold text-lg hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                    >
                        投票履歴を見る
                    </Link>
                    <button
                        onClick={handleNext}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                        次のお題に進む
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {!isVoted && (
                <div className="text-center text-slate-400 text-sm italic py-4">
                    まずは1票投じて、世の中の「普通」をのぞいてみよう！
                </div>
            )}
        </div>
    );
}
