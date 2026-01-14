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
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60" />
                {/* Spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(255,215,0,0.15)_0%,_transparent_60%)]" />
            </div>

            <div className="container-responsive py-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-xs font-bold text-yellow-800 tracking-wider">PREMIUM CONTENTS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        まるごと<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600">総選挙</span>
                    </h1>

                    {/* Description - Left Aligned & Wrapped as requested */}
                    <div className="max-w-xl mx-auto px-4 md:px-0">
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed text-left">
                            1つのテーマについて、10問連続で答えるパッケージ型コンテンツ。<br />
                            あなたの「推し」や「価値観」を徹底分析し、みんなの結果と比較してみましょう。
                        </p>
                    </div>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
                    {/* Active Themes */}
                    {MARUGOTO_THEMES.map((theme) => {
                        // Icon Mapping
                        const Icon = theme.icon === 'Anchor' ? Anchor : Layers;

                        return (
                            <Link
                                key={theme.id}
                                href={`/marugoto/${theme.id}`}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block ring-1 ring-slate-900/5"
                            >
                                {/* NEW Badge */}
                                {theme.isNew && (
                                    <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                                        NEW!
                                    </div>
                                )}

                                {/* Card Header / Image */}
                                <div className={`relative h-52 overflow-hidden`}>
                                    {theme.image ? (
                                        <div className="absolute inset-0">
                                            <img
                                                src={theme.image}
                                                alt={theme.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Gradient Overlay for readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} flex items-center justify-center`}>
                                            <Icon className="w-20 h-20 text-white/90" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                                        {theme.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {theme.description}
                                    </p>

                                    <div className="flex items-center justify-end">
                                        <span className="inline-flex items-center font-bold text-sm text-slate-900 group-hover:underline decoration-2 underline-offset-4">
                                            投票をはじめる
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Coming Soon */}
                    <div className="relative bg-slate-100 rounded-3xl overflow-hidden border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center min-h-[300px] opacity-70">
                        <Layers className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">Coming Soon...</h3>
                        <p className="text-sm text-slate-400">新しいテーマを準備中！</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
