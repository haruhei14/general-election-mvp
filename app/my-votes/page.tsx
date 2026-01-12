'use client';

import { useEffect, useState } from 'react';
import { VoteAnalyzer } from '@/components/VoteAnalyzer';
import { History, ArrowLeft, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MyVotesPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('vote_history');
        if (saved) {
            setHistory(JSON.parse(saved).reverse()); // Newest first
        }
    }, []);

    if (!isMounted) return null;

    return (
        <div className="container-responsive py-8 md:py-12 space-y-10 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 flex items-center gap-3 tracking-tighter">
                        <span className="p-3 bg-blue-600 text-white rounded-3xl shadow-lg ring-4 ring-blue-50">
                            <History className="w-8 h-8 md:w-10 md:h-10" />
                        </span>
                        マイレポート
                    </h1>
                    <p className="text-slate-500 mt-3 font-medium">あなたの選択が、日本の「普通」を描き出す。</p>
                </div>
                <Link
                    href="/"
                    className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white border-2 border-slate-100 text-slate-600 font-bold text-sm hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    トップへ戻る
                </Link>
            </div>

            {history.length > 0 ? (
                <div className="space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Personality & Analytics (Left/Top) */}
                        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                            <VoteAnalyzer history={history} />
                        </div>

                        {/* History List (Right/Bottom) */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-7 bg-slate-200 rounded-full" />
                                    直近の投票履歴
                                </h2>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent 20</span>
                            </div>

                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1 no-scrollbar lg:pr-4">
                                {history.slice(0, 20).map((item, idx) => (
                                    <div
                                        key={item.pollId + idx}
                                        className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black px-3 py-1 bg-slate-50 text-slate-400 rounded-full uppercase tracking-widest">
                                                {item.genre}
                                            </span>
                                            <div className="text-[10px] text-slate-400 font-bold">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
                                            {item.pollTitle}
                                        </h3>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2.5 overflow-hidden">
                                                <div className={cn(
                                                    "flex-shrink-0 w-2.5 h-2.5 rounded-full shadow-sm",
                                                    item.isMajority ? "bg-blue-600" : "bg-slate-300"
                                                )} />
                                                <span className="font-extrabold text-slate-700 text-sm tracking-tight truncate">{item.optionLabel}</span>
                                            </div>
                                            {item.isMajority && (
                                                <span className="flex-shrink-0 text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase">多数派!</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4 pb-10">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    const topGenre = Object.entries(history.reduce((acc: any, curr) => {
                                        acc[curr.genre] = (acc[curr.genre] || 0) + 1;
                                        return acc;
                                    }, {})).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || '？';

                                    navigator.share({
                                        title: '私のなんでも総選挙分析レポート',
                                        text: `私の最多投票ジャンルは「${topGenre}」でした！あなたの「普通」も分析してみませんか？`,
                                        url: window.location.href
                                    }).catch(console.error);
                                } else {
                                    alert('お使いのブラウザはシェア機能に対応していません。');
                                }
                            }}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-lg hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                        >
                            <Share2 className="w-5 h-5" />
                            結果をシェアする
                        </button>
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
                        >
                            次のお題へ
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <div className="mb-6 inline-block p-8 bg-slate-50 rounded-full ring-8 ring-slate-50/50">
                        <History className="w-12 h-12 text-slate-300" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">まだデータがありません</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
                        気になるお題に投票して、あなたの感性が日本のどこに位置しているか確かめてみましょう！
                    </p>
                    <Link href="/" className="btn-gradient px-12 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95">
                        さっそく投票しに行く
                    </Link>
                </div>
            )}
        </div>
    );
}
