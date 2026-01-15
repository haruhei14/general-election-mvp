import Link from 'next/link';
import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { ChevronRight, Anchor, Star, Layers } from 'lucide-react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// SEOメタデータ
export const metadata: Metadata = {
    title: 'まるごと総選挙 | テーマ別10問クイズ',
    description: '1つのテーマについて10問連続で答えるパッケージ型コンテンツ。ワンピース、back numberなど人気テーマであなたの「推し」や「価値観」を徹底分析！みんなの結果と比較してみましょう。',
    keywords: ['総選挙', 'クイズ', '診断', 'ワンピース', 'back number', 'アンケート', '投票'],
    openGraph: {
        title: 'まるごと総選挙 | テーマ別10問クイズ',
        description: '1つのテーマについて10問連続で答えるパッケージ型コンテンツ。あなたの「推し」や「価値観」を徹底分析！',
        type: 'website',
        url: 'https://nandemo-vote.com/marugoto',
        siteName: 'なんでも総選挙',
        images: [
            {
                url: 'https://nandemo-vote.com/red-curtain-bg.png',
                width: 1200,
                height: 630,
                alt: 'まるごと総選挙',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'まるごと総選挙 | テーマ別10問クイズ',
        description: '1つのテーマについて10問連続で答えるパッケージ型コンテンツ。あなたの「推し」や「価値観」を徹底分析！',
    },
};


export default function MarugotoIndexPage() {
    return (
        <div className="min-h-screen relative overflow-hidden font-serif">
            {/* Background - Red Curtain Awards Ceremony Style */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="/red-curtain-bg.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Light overlay for subtle darkening */}
                <div className="absolute inset-0 bg-black/15" />
                {/* Spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(255,215,0,0.15)_0%,_transparent_60%)]" />
            </div>

            <div className="container-responsive py-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-yellow-500/20 border border-yellow-400/50 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-yellow-300 tracking-wider">PREMIUM CONTENTS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                        まるごと<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">総選挙</span>
                    </h1>

                    {/* Description - Left Aligned & Wrapped as requested */}
                    <div className="max-w-xl mx-auto px-4 md:px-0">
                        <p className="text-white/90 text-base md:text-lg leading-relaxed text-left drop-shadow-md">
                            1つのテーマについて、10問連続で答えるパッケージ型コンテンツ。<br />
                            あなたの「推し」や「価値観」を徹底分析し、みんなの結果と比較してみましょう。
                        </p>
                    </div>
                </div>

                {/* Theme Buttons - Compact Style */}
                <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto px-4">
                    {/* One Piece Theme Button */}
                    {MARUGOTO_THEMES.filter(t => t.id === 'onepiece').map((theme) => (
                        <Link
                            key={theme.id}
                            href={`/marugoto/${theme.id}`}
                            className="group relative block bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src="/onepiece-card-bg.png" alt="" className="w-full h-full object-cover opacity-20" />
                            </div>

                            {/* NEW Badge */}
                            {theme.isNew && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-20">
                                    NEW!
                                </div>
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                {/* Icon - Straw Hat Style */}
                                <div className="w-14 h-14 bg-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-yellow-400/50">
                                    <span className="text-3xl">🏴‍☠️</span>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <p className="text-yellow-200 text-xs font-bold mb-1 whitespace-nowrap">🎌 誰もが知る少年漫画の金字塔</p>
                                    <h2 className="flex flex-col leading-none">
                                        <span
                                            className="text-2xl md:text-3xl font-black italic tracking-tighter"
                                            style={{
                                                fontFamily: 'Impact, sans-serif',
                                                color: '#FFD700',
                                                textShadow: '3px 3px 0 #8B0000, -1px -1px 0 #8B0000, 1px -1px 0 #8B0000, -1px 1px 0 #8B0000',
                                                letterSpacing: '-0.05em'
                                            }}
                                        >
                                            ONE PIECE
                                        </span>
                                        <span className="text-white/70 text-xs font-bold tracking-wider mt-1">ワンピース総選挙</span>
                                    </h2>
                                </div>

                                <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </div>
                        </Link>
                    ))}

                    {/* back number Theme Button */}
                    {MARUGOTO_THEMES.filter(t => t.id === 'backnumber').map((theme) => (
                        <Link
                            key={theme.id}
                            href={`/marugoto/${theme.id}`}
                            className="group relative block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden border border-slate-500/30"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src="/backnumber-card-bg.png" alt="" className="w-full h-full object-cover opacity-25" />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 via-slate-700/60 to-slate-600/80" />
                            </div>

                            {/* NEW Badge */}
                            {theme.isNew && (
                                <div className="absolute top-0 right-0 bg-white text-slate-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-20">
                                    NEW!
                                </div>
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                {/* Icon - Music Style */}
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                                    <span className="text-3xl">🎸</span>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <p className="text-slate-300 text-xs font-bold mb-1 whitespace-nowrap">🎵 心に刺さる切ないラブソング</p>
                                    <h2 className="flex flex-col leading-none">
                                        <span
                                            className="text-xl md:text-2xl font-light tracking-tight"
                                            style={{
                                                fontFamily: 'system-ui, sans-serif',
                                                color: '#FFFFFF',
                                                letterSpacing: '-0.02em'
                                            }}
                                        >
                                            back number
                                        </span>
                                        <span className="text-slate-400 text-xs font-bold tracking-wider mt-1">バックナンバー総選挙</span>
                                    </h2>
                                </div>

                                <ChevronRight className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </div>
                        </Link>
                    ))}

                    {/* Coming Soon */}
                    <div className="relative bg-white/10 rounded-2xl p-5 border-2 border-dashed border-white/30 flex items-center gap-4 opacity-60">
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Layers className="w-7 h-7 text-white/50" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-white/50 text-xs font-bold mb-0.5">Coming Soon...</p>
                            <h3 className="text-lg font-bold text-white/40">新しいテーマを準備中</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
