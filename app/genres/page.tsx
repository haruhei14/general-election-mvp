import { GENRES } from '@/lib/data';
import Link from 'next/link';
import { Tags, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ジャンル一覧 | なんでも総選挙',
    description: '食べ物、エンタメ、価値観など、様々なジャンルからお題を探せます。',
    openGraph: {
        title: 'ジャンル一覧 | なんでも総選挙',
        description: '様々なジャンルからお題を探そう',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=ジャンル一覧', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=ジャンル一覧'],
    },
};

// Genre gradient mapping
const GENRE_GRADIENTS: Record<string, string> = {
    '日常・生活': 'from-amber-400 to-orange-500',
    '日常・価値観': 'from-amber-400 to-orange-500',
    '食べ物': 'from-red-400 to-pink-500',
    '価値観': 'from-violet-500 to-purple-600',
    'エンタメ': 'from-pink-400 to-rose-500',
    '仕事・学び': 'from-blue-400 to-cyan-500',
    '仕事・社会人': 'from-blue-400 to-cyan-500',
    'テクノロジー': 'from-cyan-400 to-blue-500',
    '人間関係': 'from-green-400 to-emerald-500',
    '究極の選択': 'from-slate-600 to-slate-800',
    '趣味・娯楽': 'from-pink-400 to-rose-500',
};

// Genre image mapping (subtle background)
const GENRE_IMAGES: Record<string, string> = {
    '食べ物': '/genres/genre_food_1768265037980.png',
    'エンタメ': '/genres/genre_entertainment_1768265053034.png',
    '趣味・娯楽': '/genres/genre_entertainment_1768265053034.png',
    '仕事・学び': '/genres/genre_work_1768265070719.png',
    '仕事・社会人': '/genres/genre_work_1768265070719.png',
    '日常・生活': '/genres/genre_lifestyle_1768265086811.png',
    '日常・価値観': '/genres/genre_lifestyle_1768265086811.png',
    'テクノロジー': '/genres/genre_technology_1768265111976.png',
    '人間関係': '/genres/genre_relationships_1768265132983.png',
    '究極の選択': '/genres/genre_ultimate_choice_1768265148540.png',
    '価値観': '/genres/genre_values_1768265161976.png',
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

                        {/* Background Image (subtle, transparent) */}
                        {GENRE_IMAGES[genre] && (
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                style={{ backgroundImage: `url(${GENRE_IMAGES[genre]})` }}
                            />
                        )}

                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

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
