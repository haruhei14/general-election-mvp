'use client';

import Link from 'next/link';
import { BarChart3, Award, History } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        // Count items starting with vote_ in localStorage
        const updateCount = () => {
            let count = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('vote_')) {
                    count++;
                }
            }
            setVoteCount(count);
        };

        updateCount();
        // Listen for storage changes in the same window
        window.addEventListener('storage', updateCount);
        // Also update on a custom event if we want real-time update in same tab
        const interval = setInterval(updateCount, 1000);

        return () => {
            window.removeEventListener('storage', updateCount);
            clearInterval(interval);
        };
    }, []);

    const getRank = (count: number) => {
        if (count >= 10) return { label: '総選挙マニア', color: 'text-purple-500' };
        if (count >= 5) return { label: '常連投票者', color: 'text-orange-500' };
        if (count >= 1) return { label: '選挙の卵', color: 'text-blue-500' };
        return { label: '未参加', color: 'text-slate-400' };
    };

    const rank = getRank(voteCount);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <BarChart3 className="h-6 w-6 text-blue-600 group-hover:rotate-12 transition-transform" />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        なんでも総選挙
                    </span>
                </Link>

                <nav className="flex items-center gap-4 md:gap-8">
                    {/* Achievement Badge */}
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                        <Award className={`w-4 h-4 ${rank.color}`} />
                        <div className="flex flex-col items-start leading-none">
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${rank.color}`}>
                                {rank.label}
                            </span>
                            <span className="text-xs font-bold text-slate-700">
                                {voteCount} 投票
                            </span>
                        </div>
                    </div>

                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        ホーム
                    </Link>
                    <Link href="/my-votes" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        <History className="w-4 h-4 text-blue-500" />
                        マイレポート
                    </Link>
                    <Link
                        href="/poll/create"
                        className="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition-colors"
                    >
                        投票をつくる
                    </Link>
                </nav>
            </div>
        </header>
    );
}
