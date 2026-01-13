import { getPolls, getRandomPolls, Poll } from '@/lib/data';
import { AdSense } from '@/components/AdSense';
import { ChallengeMode } from '@/components/ChallengeMode';
import { DailyPollSection } from '@/components/DailyPollSection';
import Link from 'next/link';
import { Sparkles, ChevronRight, TrendingUp, PenSquare, Calendar } from 'lucide-react';

// 今日の日付をシードとして確定的にお題を選ぶ（毎日0時に切り替わる）
function getDailyPoll(polls: Poll[]): Poll | undefined {
  if (polls.length === 0) return undefined;
  // IDでソートして順序を固定
  const sortedPolls = [...polls].sort((a, b) => a.id.localeCompare(b.id));
  const today = new Date();
  // 日本時間で計算（UTC+9）
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(today.getTime() + jstOffset);
  const seed = jstDate.getUTCFullYear() * 10000 + (jstDate.getUTCMonth() + 1) * 100 + jstDate.getUTCDate();
  const index = seed % sortedPolls.length;
  return sortedPolls[index];
}

export default async function Home() {
  const challengePolls = await getRandomPolls(10);
  const allPolls = await getPolls();
  const dailyPoll = getDailyPoll(allPolls);

  return (
    <div className="container-responsive py-8 space-y-8">
      {/* Hero / Ad Space */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl min-h-[280px] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/40" />

        <div className="relative z-10 max-w-2xl px-2 md:px-0">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="inline-block">みんなの「普通」を</span>
            <span className="inline-block">可視化する。</span>
          </h1>
          <p className="text-blue-100 text-base sm:text-lg md:text-2xl mb-4 opacity-95 font-medium leading-relaxed">
            <span className="inline-block">1億人のスタンダードを決める</span>
            <span className="inline-block">「なんでも総選挙」へようこそ。</span>
          </p>
          <p className="text-blue-200/80 text-sm md:text-base max-w-lg">
            日常のこだわりから究極の決断まで。あなたの1票が、日本の新たな価値観の地図を作ります。
          </p>
        </div>
      </div>

      {/* 3つのアクションボタン */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 価値観診断 */}
        <Link
          href="/diagnosis"
          className="block bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-violet-100 text-xs font-bold mb-0.5">🧠 10問であなたを分析</p>
              <h2 className="text-base md:text-lg font-black truncate">価値観診断</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </Link>

        {/* 急上昇の総選挙 */}
        <Link
          href="/ranking"
          className="block bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-orange-100 text-xs font-bold mb-0.5">🔥 いま話題のお題</p>
              <h2 className="text-base md:text-lg font-black truncate">急上昇ランキング</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </Link>

        {/* お題を作成 */}
        <Link
          href="/poll/create"
          className="block bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <PenSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-emerald-100 text-xs font-bold mb-0.5">✨ みんなに質問しよう</p>
              <h2 className="text-base md:text-lg font-black truncate">お題を作成する</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </Link>
      </div>

      {/* 今日の一問 */}
      {dailyPoll && (
        <DailyPollSection poll={dailyPoll} />
      )}

      {/* Today's Challenge - Main Focus */}
      <ChallengeMode initialPolls={challengePolls} />

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
