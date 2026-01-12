'use client';

import { Poll, Comment } from '@/lib/data';
import { PollCard } from './PollCard';
import { VoteVisualization } from './VoteChart';
import { CommentSection } from './CommentSection';
import { useState, useEffect } from 'react';
import { Shuffle, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChallengeMode({ initialPolls }: { initialPolls: Poll[] }) {
    const [candidatePolls, setCandidatePolls] = useState<Poll[]>(initialPolls);
    const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [votedPollId, setVotedPollId] = useState<string | null>(null);

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
        setShowOptions(false);
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
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-purple-100 text-purple-600 rounded-xl flex-shrink-0">
                        <Shuffle className="w-5 h-5" />
                    </span>
                    <span className="truncate">今日のチャレンジ</span>
                </h2>
                {isVoted && (
                    <button
                        onClick={handleNext}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                    >
                        次のお題へ
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-12 gap-8",
                isVoted ? "items-start" : "items-center"
            )}>
                <div className={cn(
                    "lg:col-span-12",
                    isVoted ? "lg:col-span-12 xl:col-span-4" : "max-w-2xl mx-auto w-full"
                )}>
                    <PollCard poll={currentPoll} hideOptions={!showOptions} />

                    {!showOptions && !isVoted && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => setShowOptions(true)}
                                className="w-full btn-gradient py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
                            >
                                投票へ進む
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                {isVoted && (
                    <>
                        <div className="lg:col-span-12 xl:col-span-4 space-y-6 animate-in slide-in-from-right-4 duration-700">
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                    現在の投票結果
                                </h4>
                                <VoteVisualization pollId={currentPoll.id} initialOptions={currentPoll.options} />
                            </div>
                        </div>

                        <div className="lg:col-span-12 xl:col-span-4 animate-in slide-in-from-right-8 duration-1000">
                            <CommentSection pollId={currentPoll.id} comments={comments} />
                        </div>
                    </>
                )}
            </div>

            {!isVoted && (
                <div className="text-center text-slate-400 text-sm">
                    まずは1票投じて、みんなの意見をのぞいてみよう！
                </div>
            )}
        </div>
    );
}
