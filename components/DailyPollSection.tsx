'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Poll } from '@/lib/data';
import { Calendar, ChevronDown, ChevronUp, Vote, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DailyPollSection({ poll }: { poll: Poll }) {
    const [isOpen, setIsOpen] = useState(false);

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

            {/* 展開コンテンツ */}
            {isOpen && (
                <div className="px-5 md:px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-slate-100 pt-5">
                        <p className="text-slate-500 text-sm mb-4">
                            どれを選ぶ？タップして詳細ページで投票しよう！
                        </p>

                        {/* 選択肢プレビュー */}
                        <div className="space-y-2 mb-6">
                            {poll.options.slice(0, 4).map((option, idx) => (
                                <div
                                    key={option.id}
                                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                                >
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    <span className="text-slate-700 font-medium text-sm truncate">
                                        {option.label}
                                    </span>
                                </div>
                            ))}
                            {poll.options.length > 4 && (
                                <p className="text-slate-400 text-xs text-center py-2">
                                    +{poll.options.length - 4}件の選択肢
                                </p>
                            )}
                        </div>

                        {/* 投票へのCTA */}
                        <Link
                            href={`/poll/${poll.id}`}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all group"
                        >
                            <Vote className="w-5 h-5" />
                            投票して結果を見る
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
