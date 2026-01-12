import { getPolls, GENRES } from '@/lib/data';
import { PollCard } from '@/components/PollCard';
import { AdSense } from '@/components/AdSense';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Flame, Shuffle, Trophy } from 'lucide-react';

export default async function Home(props: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await props.searchParams;
  const polls = await getPolls(genre);

  return (
    <div className="container-responsive py-8 space-y-10">
      {/* Hero / Ad Space */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl min-h-[300px] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/40" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            みんなの「好き」が<br />
            ここにある。
          </h1>
          <p className="text-blue-100 text-lg mb-8 opacity-95">
            日常の選択から究極の決断まで。あなたの1票が日本のスタンダードを決めるかもしれません。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/poll/create" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
              お題を作成する
            </Link>
          </div>
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdSense type="banner" />

      {/* Navigation / Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          <Link
            href="/"
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm",
              !genre
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            )}
          >
            すべて
          </Link>
          {GENRES.map(g => (
            <Link
              key={g}
              href={`/?genre=${g}`}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm",
                genre === g
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              {g}
            </Link>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 text-orange-700 font-bold text-sm hover:bg-orange-200 transition-colors">
            <Flame className="w-4 h-4" />
            人気
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-bold text-sm hover:bg-purple-200 transition-colors">
            <Shuffle className="w-4 h-4" />
            ランダム
          </button>
        </div>
      </div>

      {/* Main Grid */}
      {polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {polls.map(poll => (
            <div key={poll.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PollCard poll={poll} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="mb-4 inline-block p-4 bg-slate-50 rounded-full">
            <Shuffle className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium text-lg">まだこのジャンルのお題はありません</p>
          <p className="text-slate-400 text-sm mt-1">最初の一歩を踏み出してみませんか？</p>
          <Link href="/poll/create" className="text-blue-600 font-bold hover:underline mt-4 inline-block">
            お題を作成する
          </Link>
        </div>
      )}

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
