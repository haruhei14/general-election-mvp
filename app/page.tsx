import { getPolls, GENRES, getRandomPolls } from '@/lib/data';
import { PollCard } from '@/components/PollCard';
import { AdSense } from '@/components/AdSense';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Shuffle, Clock } from 'lucide-react';
import { ChallengeMode } from '@/components/ChallengeMode';

export default async function Home(props: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await props.searchParams;
  const polls = await getPolls(genre);
  const challengePolls = await getRandomPolls(10);

  // Show only 6 latest polls in the grid if on home
  const displayPolls = genre ? polls : polls.slice(0, 6);

  return (
    <div className="container-responsive py-8 space-y-12">
      {/* Hero / Ad Space */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl min-h-[300px] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/40" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            <span className="inline-block">みんなの「好き」が</span>
            <span className="inline-block">ここにある。</span>
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

      {!genre && (
        <>
          <ChallengeMode initialPolls={challengePolls} />
          <hr className="border-slate-100" />
        </>
      )}

      {/* Top Banner Ad */}
      <AdSense type="banner" />

      {/* Navigation / Filter */}
      <div className="space-y-6">
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

          <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
            <Clock className="w-4 h-4" />
            {genre ? `${genre}の新着お題` : '最新の総選挙'}
          </div>
        </div>

        {/* Main Grid */}
        {displayPolls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPolls.map(poll => (
              <div key={poll.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <PollCard poll={poll} hideOptions={true} />
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
      </div>

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
