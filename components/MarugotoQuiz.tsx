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

    // Theme request form state
    const [requestText, setRequestText] = useState('');
    const [requestStatus, setRequestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [requestMessage, setRequestMessage] = useState('');

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
            <div className="relative min-h-screen">
                {/* Background - Red Curtain Awards Ceremony Style */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <img
                        src="/red-curtain-bg.png"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Light overlay for subtle darkening */}
                    <div className="absolute inset-0 bg-black/15" />
                    {/* Spotlight effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(255,215,0,0.2)_0%,_transparent_50%)]" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto pb-20 px-4">
                    {/* Result Header - Grand Prix Style */}
                    <div className="text-center mb-10 pt-8 relative">
                        <div className="inline-block mb-2">
                            <Trophy className="w-12 h-12 text-yellow-400 mx-auto drop-shadow-lg" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                            診断結果発表
                        </h2>
                        <p className="text-yellow-300/80 font-serif italic drop-shadow-md">The Grand Prix of Your Choice</p>
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
                                        <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{poll.title}</h4>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                                            <span className="text-xs text-slate-500">総投票数:</span>
                                            <span className="text-sm font-bold text-slate-700">{totalVotes.toLocaleString()}票</span>
                                        </div>
                                    </div>

                                    {/* Podium Display */}
                                    <div className="flex items-end justify-center gap-1 md:gap-3 mb-8 h-56 md:h-64 pb-2 border-b border-slate-100 px-1">
                                        {/* 2nd Place */}
                                        {second && (
                                            <div className="flex flex-col items-center w-1/3 max-w-[110px] group">
                                                <div className="w-full bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-xl shadow-lg relative h-32 md:h-40 flex flex-col items-center justify-between pt-5 pb-2">
                                                    {/* Medal */}
                                                    <div className="absolute -top-3 w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-2 border-white shadow-md flex items-center justify-center text-xs">
                                                        🥈
                                                    </div>
                                                    {/* Rank Number */}
                                                    <div className="text-white/30 text-2xl font-black">2</div>
                                                    {/* Label inside podium */}
                                                    <div className="text-center px-1 flex-1 flex flex-col justify-center overflow-hidden">
                                                        <span className="text-[10px] md:text-xs font-bold text-white drop-shadow-sm line-clamp-2 leading-tight">{second.label}</span>
                                                    </div>
                                                    {/* Percentage and Votes */}
                                                    <div className="text-center">
                                                        <div className="text-base md:text-lg font-black text-white/90">{totalVotes > 0 ? Math.round((second.votes / totalVotes) * 100) : 0}%</div>
                                                        <div className="text-[9px] text-white/60 font-bold">{second.votes.toLocaleString()}票</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* 1st Place */}
                                        {first && (
                                            <div className="flex flex-col items-center w-1/3 max-w-[120px] z-10 group">
                                                <div className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl shadow-xl relative h-40 md:h-52 flex flex-col items-center justify-between pt-5 pb-2">
                                                    {/* Crown */}
                                                    <div className="absolute -top-4 w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-white shadow-lg flex items-center justify-center text-base">
                                                        👑
                                                    </div>
                                                    {/* Rank Number */}
                                                    <div className="text-white/30 text-3xl font-black">1</div>
                                                    {/* Label inside podium */}
                                                    <div className="text-center px-1 flex-1 flex flex-col justify-center overflow-hidden">
                                                        <span className="text-xs md:text-sm font-bold text-white drop-shadow-md line-clamp-2 leading-tight">{first.label}</span>
                                                    </div>
                                                    {/* Percentage and Votes */}
                                                    <div className="text-center">
                                                        <div className="text-lg md:text-xl font-black text-white">{totalVotes > 0 ? Math.round((first.votes / totalVotes) * 100) : 0}%</div>
                                                        <div className="text-[10px] text-white/70 font-bold">{first.votes.toLocaleString()}票</div>
                                                    </div>
                                                    {/* Texture */}
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay rounded-t-xl" />
                                                </div>
                                            </div>
                                        )}

                                        {/* 3rd Place */}
                                        {third && (
                                            <div className="flex flex-col items-center w-1/3 max-w-[110px] group">
                                                <div className="w-full bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-xl shadow-lg relative h-24 md:h-32 flex flex-col items-center justify-between pt-4 pb-2">
                                                    {/* Medal */}
                                                    <div className="absolute -top-3 w-7 h-7 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-white shadow-md flex items-center justify-center text-xs">
                                                        🥉
                                                    </div>
                                                    {/* Rank Number */}
                                                    <div className="text-white/30 text-xl font-black">3</div>
                                                    {/* Label inside podium */}
                                                    <div className="text-center px-1 flex-1 flex flex-col justify-center overflow-hidden">
                                                        <span className="text-[10px] md:text-xs font-bold text-white drop-shadow-sm line-clamp-2 leading-tight">{third.label}</span>
                                                    </div>
                                                    {/* Percentage and Votes */}
                                                    <div className="text-center">
                                                        <div className="text-sm md:text-base font-black text-white/90">{totalVotes > 0 ? Math.round((third.votes / totalVotes) * 100) : 0}%</div>
                                                        <div className="text-[9px] text-white/60 font-bold">{third.votes.toLocaleString()}票</div>
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
                        {/* Share Buttons */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                            <h4 className="font-bold text-slate-700 mb-4 text-center flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                結果をシェアしよう！
                            </h4>
                            <div className="flex gap-3 justify-center">
                                {/* X (Twitter) Share */}
                                <button
                                    onClick={() => {
                                        const text = `【${theme.title}総選挙】に参加しました！🗳️\n\nあなたも10問答えて診断してみませんか？\n\n#なんでも総選挙 #${theme.title}総選挙`;
                                        const url = `https://nandemo-vote.com/marugoto/${theme.id}`;
                                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    Xでシェア
                                </button>

                                {/* LINE Share */}
                                <button
                                    onClick={() => {
                                        const text = `【${theme.title}総選挙】に参加しました！🗳️ あなたも診断してみよう！`;
                                        const url = `https://nandemo-vote.com/marugoto/${theme.id}`;
                                        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#06C755] text-white rounded-xl font-bold hover:bg-[#05b04c] transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                    LINE
                                </button>
                            </div>
                        </div>

                        <Link href="/marugoto" className="block w-full text-center py-4 rounded-xl bg-slate-100 font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                            他のテーマを探す
                        </Link>

                        {/* Suggestion Form */}
                        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                            <MessageSquarePlus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <h4 className="font-bold text-slate-700 mb-1">次のお題をリクエスト！</h4>
                            <p className="text-xs text-slate-500 mb-4">こんなテーマでやってほしい！という要望があれば教えてください。</p>

                            {requestStatus === 'success' ? (
                                <div className="py-4 text-green-600 font-bold flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" />
                                    <span>リクエストを受け付けました！</span>
                                </div>
                            ) : (
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (!requestText.trim() || requestStatus === 'sending') return;

                                    setRequestStatus('sending');
                                    setRequestMessage('');

                                    try {
                                        const res = await fetch('/api/theme-request', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ requestText: requestText.trim(), source: 'marugoto' })
                                        });

                                        const data = await res.json();

                                        if (res.ok) {
                                            setRequestStatus('success');
                                            setRequestText('');
                                        } else {
                                            setRequestStatus('error');
                                            setRequestMessage(data.error || '送信に失敗しました');
                                        }
                                    } catch (err) {
                                        setRequestStatus('error');
                                        setRequestMessage('ネットワークエラーが発生しました');
                                    }
                                }}>
                                    <textarea
                                        className="w-full p-3 rounded-lg border border-slate-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={2}
                                        placeholder="例：NARUTO、ジブリ、プロ野球..."
                                        value={requestText}
                                        onChange={(e) => setRequestText(e.target.value)}
                                        maxLength={500}
                                        disabled={requestStatus === 'sending'}
                                    />
                                    {requestStatus === 'error' && (
                                        <p className="text-red-500 text-xs mb-2">{requestMessage}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={!requestText.trim() || requestStatus === 'sending'}
                                        className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {requestStatus === 'sending' ? '送信中...' : '送信する'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz View
    return (
        <div className="relative min-h-screen">
            {/* Background - Red Curtain (lighter for quiz) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="/red-curtain-bg.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 max-w-xl mx-auto min-h-screen flex flex-col justify-center px-4 py-8">
                {/* Progress Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-3">
                        <div>
                            <span className="text-yellow-400 text-xs font-bold tracking-wider">QUESTION</span>
                            <div className="text-white text-2xl md:text-3xl font-black">
                                第{currentIndex + 1}問 <span className="text-white/50 text-lg font-normal">/ 全{polls.length}問</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-yellow-400 text-2xl font-black">{Math.round(progress)}%</div>
                        </div>
                    </div>
                    {/* Progress Bar - Red/Gold Theme */}
                    <div className="h-3 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-yellow-300 transition-all duration-500 ease-out shadow-lg"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-8 relative overflow-hidden">
                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500" />

                    {/* Question Number Badge */}
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
                        <span className="text-red-600 text-xs font-bold">🏴‍☠️ CASE {currentIndex + 1}</span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2 leading-relaxed">
                        {currentPoll.title}
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        {currentPoll.description}
                    </p>

                    {/* Answer Options */}
                    <div className="space-y-3 md:space-y-4">
                        {currentPoll.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleVote(option.id)}
                                disabled={isVoting}
                                className={`w-full p-4 md:p-5 rounded-xl text-left font-bold transition-all duration-300 flex items-center gap-3 group
                                    ${answers[currentPoll.id] === option.id
                                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg scale-[1.02] ring-2 ring-red-300'
                                        : 'bg-slate-50 text-slate-700 hover:bg-red-50 hover:border-red-200 border-2 border-transparent hover:scale-[1.01] active:scale-[0.99]'
                                    }
                                `}
                            >
                                {/* Option Letter */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0
                                    ${answers[currentPoll.id] === option.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-200 text-slate-500 group-hover:bg-red-100 group-hover:text-red-600'
                                    }
                                `}>
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className="flex-grow text-sm md:text-base">{option.label}</span>
                                {answers[currentPoll.id] === option.id && (
                                    <Check className="w-5 h-5 flex-shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Helper Text */}
                <div className="mt-6 text-center">
                    <p className="text-white/60 text-xs font-medium">
                        💡 直感で選んでください
                    </p>
                </div>
            </div>
        </div>
    );
}

// Add Tailwind Animation for checkmark
// You might need to add keyframes to globals.css or tailwind.config.ts if 'animate-scale-in' doesn't exist.
// For now relying on standard transitions.
