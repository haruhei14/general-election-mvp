'use client';

import { useEffect, useState } from 'react';
import { VoteAnalyzer } from '@/components/VoteAnalyzer';
import { History, LayoutGrid, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MyVotesPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('vote_history');
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    if (!isMounted) return null;

    return (
        <div className="container-responsive py-12 space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
                        <span className="p-2.5 bg-blue-100 text-blue-600 rounded-2xl">
                            <History className="w-8 h-8" />
                        </span>
                        マイ投票レポート
                    </h1>
                    <p className="text-slate-500 mt-2">あなたの投票履歴と、そこから見える傾向を分析します。</p>
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    トップへ戻る
                </Link>
            </div>

            {history.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Personality & Analytics (Left/Top) */}
                    <div className="lg:col-span-7 space-y-10">
                        <VoteAnalyzer history={history} />
                    </div>

                    {/* History List (Right/Bottom) */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
                            最近の投票履歴
                        </h2>
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 no-scrollbar">
                            {history.map((item, idx) => (
                                <div key={item.pollId + idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                                            {item.genre}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-3 underline decoration-blue-100 underline-offset-4">
                                        {item.pollTitle}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="font-bold text-blue-600">{item.optionLabel}</span>
                                        <span className="text-slate-400 text-xs text-nowrap">を選択</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="mb-6 inline-block p-6 bg-slate-50 rounded-full">
                        <LayoutGrid className="w-12 h-12 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">まだデータがありません</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">
                        気になるお題に投票して、あなたの性格や志向を分析してみましょう！
                    </p>
                    <Link href="/" className="btn-gradient px-8 py-3 rounded-full font-bold">
                        さっそく投票しに行く
                    </Link>
                </div>
            )}
        </div>
    );
}
