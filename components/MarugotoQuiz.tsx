'use client';

import { useState } from 'react';
import { Poll } from '@/lib/data';
import { MarugotoTheme } from '@/lib/marugoto-data';
import { votePoll } from '@/lib/data';
import { ArrowRight, Check, Share2, MessageSquarePlus, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface MarugotoQuizProps {
    theme: MarugotoTheme;
    initialPolls: Poll[];
}

export function MarugotoQuiz({ theme, initialPolls }: MarugotoQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({}); // pollId -> optionId
    const [isFinished, setIsFinished] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    // Local copy of polls to reflect vote updates immediately for result view
    const [polls, setPolls] = useState<Poll[]>(initialPolls);

    const currentPoll = polls[currentIndex];
    const progress = ((currentIndex + (isFinished ? 1 : 0)) / polls.length) * 100;

    const handleVote = async (optionId: string) => {
        if (isVoting) return;
        setIsVoting(true);

        try {
            // Optimistic update
            const updatedPolls = [...polls];
            const pollIndex = updatedPolls.findIndex(p => p.id === currentPoll.id);
            if (pollIndex !== -1) {
                updatedPolls[pollIndex] = {
                    ...updatedPolls[pollIndex],
                    options: updatedPolls[pollIndex].options.map(opt =>
                        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                    )
                };
            }
            setPolls(updatedPolls);
            setAnswers(prev => ({ ...prev, [currentPoll.id]: optionId }));

            // Server update (fire and forget to not block UI)
            votePoll(currentPoll.id, optionId);

            // Wait a bit then move next
            await new Promise(resolve => setTimeout(resolve, 600));

            if (currentIndex < polls.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        } catch (error) {
            console.error('Vote failed', error);
        } finally {
            setIsVoting(false);
        }
    };

    if (isFinished) {
        return (
            <div className="max-w-2xl mx-auto pb-20">
                {/* Result Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-2">診断完了！</h2>
                    <p className="text-slate-300">すべての回答が終了しました</p>
                </div>

                {/* AI Analysis Column */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">AI Analysis</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">
                        {theme.aiColumn.title}
                    </h3>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {theme.aiColumn.content}
                    </div>
                </div>

                {/* Result Detail List */}
                <div className="space-y-6 mb-12">
                    <h3 className="text-xl font-bold text-slate-800 px-2">みんなの結果と比較</h3>
                    {polls.map((poll, idx) => {
                        const myChoiceId = answers[poll.id];
                        const myChoice = poll.options.find(o => o.id === myChoiceId);
                        const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

                        // Sort options by votes for ranking
                        const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);
                        const topOption = sortedOptions[0];

                        return (
                            <div key={poll.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                                <div className="text-xs font-bold text-slate-400 mb-1">Q{idx + 1}</div>
                                <h4 className="font-bold text-slate-800 mb-3">{poll.title}</h4>

                                <div className="mb-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex justify-between items-center">
                                    <span className="text-sm font-bold text-blue-800">あなたの回答</span>
                                    <span className="text-sm text-blue-600">{myChoice?.label}</span>
                                </div>

                                {/* Graph for Top 3 + Mine */}
                                <div className="space-y-2">
                                    {sortedOptions.slice(0, 3).map((opt, rank) => {
                                        const isMine = opt.id === myChoiceId;
                                        const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                                        return (
                                            <div key={opt.id} className="relative h-8 rounded-full bg-slate-100 overflow-hidden text-xs flex items-center px-3">
                                                <div
                                                    className={`absolute inset-y-0 left-0 ${isMine ? 'bg-blue-500' : 'bg-slate-300'} opacity-30`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                                <span className="relative z-10 flex-1 truncate font-medium text-slate-700">
                                                    {rank + 1}. {opt.label}
                                                </span>
                                                <span className="relative z-10 font-bold text-slate-600">{percentage}%</span>
                                            </div>
                                        );
                                    })}
                                    {/* If my choice is not in top 3, show it */}
                                    {!sortedOptions.slice(0, 3).find(o => o.id === myChoiceId) && myChoice && (
                                        <div className="relative h-8 rounded-full bg-slate-100 overflow-hidden text-xs flex items-center px-3 mt-1">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-blue-500 opacity-30"
                                                style={{ width: `${totalVotes > 0 ? Math.round((myChoice.votes / totalVotes) * 100) : 0}%` }}
                                            />
                                            <span className="relative z-10 flex-1 truncate font-medium text-slate-700">
                                                ... {myChoice.label}
                                            </span>
                                            <span className="relative z-10 font-bold text-slate-600">
                                                {totalVotes > 0 ? Math.round((myChoice.votes / totalVotes) * 100) : 0}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <div className="grid gap-4">
                    <Link href="/marugoto" className="block w-full text-center py-4 rounded-xl bg-slate-100 font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                        他のテーマを探す
                    </Link>

                    {/* Suggestion Form Placeholder */}
                    <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                        <MessageSquarePlus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <h4 className="font-bold text-slate-700 mb-1">次のお題をリクエスト！</h4>
                        <p className="text-xs text-slate-500 mb-4">こんなテーマでやってほしい！という要望があれば教えてください。</p>
                        <textarea
                            className="w-full p-3 rounded-lg border border-slate-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder="例：NARUTO、ジブリ、プロ野球..."
                        />
                        <button className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700">
                            送信する
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz View
    return (
        <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col justify-center">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>CASE {currentIndex + 1} / {polls.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${theme.color}`} />

                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-snug">
                    {currentPoll.title}
                </h2>
                <p className="text-slate-500 text-sm mb-8">
                    {currentPoll.description}
                </p>

                <div className="space-y-3">
                    {currentPoll.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            disabled={isVoting}
                            className={`w-full p-4 rounded-xl text-left font-bold transition-all duration-200 flex items-center justify-between group
                                ${answers[currentPoll.id] === option.id
                                    ? 'bg-blue-600 text-white shadow-lg scale-[1.02]'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:scale-[1.01]'
                                }
                            `}
                        >
                            <span>{option.label}</span>
                            {answers[currentPoll.id] === option.id && (
                                <Check className="w-5 h-5 animate-scale-in" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
                直感で選んでください
            </div>
        </div>
    );
}

// Add Tailwind Animation for checkmark
// You might need to add keyframes to globals.css or tailwind.config.ts if 'animate-scale-in' doesn't exist.
// For now relying on standard transitions.
