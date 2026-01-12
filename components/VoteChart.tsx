'use client';

import { PollOption } from '@/lib/data';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function VoteVisualization({
    pollId,
    initialOptions,
    votedOptionId
}: {
    pollId: string,
    initialOptions: PollOption[],
    votedOptionId?: string | null
}) {
    const [options, setOptions] = useState<PollOption[]>(initialOptions);
    const [hasVotedLocally, setHasVotedLocally] = useState(false);

    useEffect(() => {
        const voted = localStorage.getItem(`vote_${pollId}`);
        if (voted) setHasVotedLocally(true);
    }, [pollId]);

    useEffect(() => {
        // Fetch latest results to stay in sync
        const fetchLatest = async () => {
            try {
                const res = await fetch(`/api/vote?pollId=${pollId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOptions(data.options);
                }
            } catch (e) {
                console.error('Polling error:', e);
            }
        };

        const interval = setInterval(fetchLatest, 5000);
        return () => clearInterval(interval);
    }, [pollId]);

    const total = options.reduce((acc, curr) => acc + curr.votes, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Total Votes Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <Users className="w-4 h-4" />
                    総投票数
                </div>
                <div className="text-xl font-black text-slate-900">
                    {total.toLocaleString()} 票
                </div>
            </div>

            {/* Bar List */}
            <div className="space-y-4">
                {options.map((opt) => {
                    const percentage = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                    const isSelected = votedOptionId === opt.id;

                    return (
                        <div key={opt.id} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "font-bold text-sm transition-colors",
                                        isSelected ? "text-blue-600" : "text-slate-700"
                                    )}>
                                        {opt.label}
                                    </span>
                                    {isSelected && (
                                        <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                            <Check className="w-2.5 h-2.5" />
                                            Selected
                                        </span>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className={cn(
                                        "text-lg font-black italic",
                                        isSelected ? "text-blue-600" : "text-slate-900"
                                    )}>
                                        {percentage}%
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold ml-1">
                                        ({opt.votes}票)
                                    </span>
                                </div>
                            </div>

                            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden relative">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
                                        isSelected
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                            : "bg-slate-300"
                                    )}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {(votedOptionId || hasVotedLocally) && (
                <div className="pt-6 animate-in slide-in-from-bottom-2 duration-500">
                    <Link
                        href="/api/poll/random"
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                        次のお題に進む
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            )}
        </div>
    );
}
