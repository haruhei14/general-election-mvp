'use client';

import { useState } from 'react';
import { Poll } from '@/lib/data';
import { MarugotoTheme } from '@/lib/marugoto-data';
import { votePoll } from '@/lib/data';
import { ArrowRight, Check, Share2, MessageSquarePlus, RefreshCw, Trophy, Sparkles } from 'lucide-react';
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
                {/* Result Header - Grand Prix Style */}
                <div className="text-center mb-10 relative">
                    <div className="inline-block mb-2">
                        <Trophy className="w-12 h-12 text-yellow-500 mx-auto drop-shadow-lg" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
                        診断結果発表
                    </h2>
                    <p className="text-slate-500 font-serif italic">The Grand Prix of Your Choice</p>
                </div>

                {/* Result Detail List - Moved to Top & Styled as Podium */}
                <div className="space-y-12 mb-16">
                    {polls.map((poll, idx) => {
                        const myChoiceId = answers[poll.id];
                        const myChoice = poll.options.find(o => o.id === myChoiceId);
                        const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

                        // Sort options by votes for ranking
                        const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);

                        // Assign ranks including ties handling if needed, simple index for now
                        const top3 = sortedOptions.slice(0, 3);
                        // Ensure 3 items for podium layout logic even if less options
                        const [first, second, third] = top3;

                        return (
                            <div key={poll.id} className="relative bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 overflow-hidden">
                                {/* Background Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full pointer-events-none" />

                                <div className="text-center mb-8 relative z-10">
                                    <div className="text-xs font-bold text-slate-400 tracking-widest mb-2 uppercase">QUESTION {idx + 1}</div>
                                    <h4 className="text-xl md:text-2xl font-bold text-slate-800">{poll.title}</h4>
                                </div>

                                {/* Podium Display */}
                                <div className="flex items-end justify-center gap-2 md:gap-4 mb-8 h-48 md:h-56 pb-2 border-b border-slate-100 px-2">
                                    {/* 2nd Place */}
                                    {second && (
                                        <div className="flex flex-col items-center w-1/3 max-w-[120px] group">
                                            <div className="w-full bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-xl shadow-lg relative h-28 md:h-36 flex flex-col items-center justify-between pt-6 pb-3">
                                                {/* Medal */}
                                                <div className="absolute -top-4 w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-2 border-white shadow-md flex items-center justify-center text-sm">
                                                    🥈
                                                </div>
                                                {/* Label inside podium */}
                                                <div className="text-center px-2 flex-1 flex flex-col justify-center">
                                                    <span className="text-xs md:text-sm font-bold text-white drop-shadow-sm line-clamp-2">{second.label}</span>
                                                </div>
                                                {/* Percentage and Rank */}
                                                <div className="text-center">
                                                    <div className="text-lg md:text-xl font-black text-white/80">{totalVotes > 0 ? Math.round((second.votes / totalVotes) * 100) : 0}%</div>
                                                    <div className="text-xl font-black text-white/40">2</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 1st Place */}
                                    {first && (
                                        <div className="flex flex-col items-center w-1/3 max-w-[130px] z-10 group">
                                            <div className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl shadow-xl relative h-36 md:h-44 flex flex-col items-center justify-between pt-6 pb-3">
                                                {/* Crown */}
                                                <div className="absolute -top-5 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-white shadow-lg flex items-center justify-center text-lg">
                                                    👑
                                                </div>
                                                {/* Label inside podium */}
                                                <div className="text-center px-2 flex-1 flex flex-col justify-center">
                                                    <span className="text-sm md:text-base font-bold text-white drop-shadow-md line-clamp-2">{first.label}</span>
                                                </div>
                                                {/* Percentage and Rank */}
                                                <div className="text-center">
                                                    <div className="text-xl md:text-2xl font-black text-white">{totalVotes > 0 ? Math.round((first.votes / totalVotes) * 100) : 0}%</div>
                                                    <div className="text-2xl font-black text-white/50">1</div>
                                                </div>
                                                {/* Texture */}
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay rounded-t-xl" />
                                            </div>
                                        </div>
                                    )}

                                    {/* 3rd Place */}
                                    {third && (
                                        <div className="flex flex-col items-center w-1/3 max-w-[120px] group">
                                            <div className="w-full bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-xl shadow-lg relative h-20 md:h-28 flex flex-col items-center justify-between pt-5 pb-2">
                                                {/* Medal */}
                                                <div className="absolute -top-4 w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-white shadow-md flex items-center justify-center text-sm">
                                                    🥉
                                                </div>
                                                {/* Label inside podium */}
                                                <div className="text-center px-2 flex-1 flex flex-col justify-center">
                                                    <span className="text-xs md:text-sm font-bold text-white drop-shadow-sm line-clamp-2">{third.label}</span>
                                                </div>
                                                {/* Percentage and Rank */}
                                                <div className="text-center">
                                                    <div className="text-lg md:text-xl font-black text-white/80">{totalVotes > 0 ? Math.round((third.votes / totalVotes) * 100) : 0}%</div>
                                                    <div className="text-xl font-black text-white/40">3</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* My Answer Highlight */}
                                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                                    <div className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded">YOU</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 font-bold">あなたの回答</div>
                                        <div className="text-sm font-bold text-slate-800">{myChoice?.label}</div>
                                    </div>
                                    {/* Rank Badge for My Choice */}
                                    {top3.find(o => o.id === myChoiceId) ? (
                                        <div className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                                            TOP 3入り！
                                        </div>
                                    ) : (
                                        <div className="text-xs font-bold text-slate-400 px-2 py-1">
                                            {sortedOptions.findIndex(o => o.id === myChoiceId) + 1}位
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AI Analysis Column - Moved Below Results */}
                <div className="bg-white rounded-3xl shadow-xl border border-yellow-500/20 p-6 md:p-8 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        <span className="font-bold text-slate-700 tracking-wider">AI ANALYST REPORT</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">
                        {theme.aiColumn.title}
                    </h3>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                        {theme.aiColumn.content}
                    </div>
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
