import Link from 'next/link';
import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { ChevronRight, Anchor, Star, Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

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
                    {MARUGOTO_THEMES.map((theme) => (
                        <Link
                            key={theme.id}
                            href={`/marugoto/${theme.id}`}
                            className="group relative block bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden"
                        >
                            {/* NEW Badge */}
                            {theme.isNew && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm">
                                    NEW!
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                {/* Icon - Straw Hat Style */}
                                <div className="w-14 h-14 bg-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-yellow-400/50">
                                    <span className="text-3xl">🏴‍☠️</span>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <p className="text-yellow-200 text-xs font-bold mb-0.5">🎌 誰もが知る少年漫画の金字塔</p>
                                    <h2 className="text-xl md:text-2xl font-black truncate tracking-wide" style={{ fontFamily: 'serif', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                                        {theme.title}
                                    </h2>
                                </div>

                                <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
