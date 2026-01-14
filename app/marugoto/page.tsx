import Link from 'next/link';
import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { Anchor, ArrowRight, Brain, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function MarugotoIndexPage() {
    return (
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 max-w-4xl">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                    まるごと総選挙
                </h1>
                <p className="text-slate-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
                    1つのテーマについて、10問連続で答えるパッケージ型コンテンツ。<br />
                    あなたの「推し」や「価値観」を徹底分析し、みんなの結果と比較してみましょう。
                </p>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MARUGOTO_THEMES.map((theme) => (
                    <Link href={`/marugoto/${theme.id}`} key={theme.id} className="group">
                        <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                            {/* Card Header Gradient */}
                            <div className={`h-24 bg-gradient-to-r ${theme.color} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/10" />
                                <div className="absolute -bottom-6 -right-6 text-white/20 transform rotate-12">
                                    {/* Icon Placeholder - in real app mapped dynamically */}
                                    <Anchor size={120} />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600`}>
                                        10 Questions
                                    </div>
                                    {theme.isNew && (
                                        <span className="px-3 py-1 rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
                                            NEW!
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                    {theme.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {theme.description}
                                </p>

                                <div className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-900 text-white font-bold group-hover:bg-blue-600 transition-colors">
                                    投票をはじめる
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Coming Soon Placeholder */}
                <div className="rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center opacity-70">
                    <Brain className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Coming Soon...</h3>
                    <p className="text-slate-400 text-sm">新しいテーマを準備中！</p>
                </div>
            </div>
        </div>
    );
}
