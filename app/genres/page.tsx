import { GENRES } from '@/lib/data';
import Link from 'next/link';
import { Tags, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Genre gradient mapping
const GENRE_GRADIENTS: Record<string, string> = {
    '日常・生活': 'from-amber-400 to-orange-500',
    '食べ物': 'from-red-400 to-pink-500',
    '価値観': 'from-violet-500 to-purple-600',
    'エンタメ': 'from-pink-400 to-rose-500',
    '仕事・学び': 'from-blue-400 to-cyan-500',
    'テクノロジー': 'from-cyan-400 to-blue-500',
    '人間関係': 'from-green-400 to-emerald-500',
    '究極の選択': 'from-slate-600 to-slate-800',
};

export default function GenresPage() {
    return (
        <div className="container-responsive py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                        <Tags className="w-6 h-6" />
                    </span>
                    ジャンル一覧
                </h1>
                <p className="text-slate-500 mt-2">興味のあるジャンルを選んで、お題を探してみましょう。</p>
            </div>

            {/* Genre Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {GENRES.map(genre => (
                    <Link
                        key={genre}
                        href={`/polls?genre=${encodeURIComponent(genre)}`}
                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {/* Background Gradient */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-all group-hover:scale-110 duration-500",
                            GENRE_GRADIENTS[genre] || 'from-slate-400 to-slate-600'
                        )} />

                        {/* Overlay Pattern */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-4">
                            <h2 className="text-white font-black text-lg md:text-xl drop-shadow-lg">
                                {genre}
                            </h2>
                            <div className="flex items-center gap-1 text-white/80 text-sm font-bold mt-1 group-hover:text-white transition-colors">
                                <span>お題を見る</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
