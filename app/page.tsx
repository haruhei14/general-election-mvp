import { getPolls, getRandomPolls, getLatestDailyPoll, Poll } from '@/lib/data';
import { MARUGOTO_THEMES } from '@/lib/marugoto-data';
import { AdSense } from '@/components/AdSense';
import { ChallengeMode } from '@/components/ChallengeMode';
import { DailyPollSection } from '@/components/DailyPollSection';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ChevronRight, TrendingUp, PenSquare, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

// キャッシュを無効化して常に最新データを取得
export const dynamic = 'force-dynamic';

// 日付ベースでランダムお題を選ぶ（フォールバック用）
function getDateBasedPoll(polls: Poll[]): Poll | undefined {
  if (polls.length === 0) return undefined;
  // daily_trend, seed, userのみを対象とし、marugotoなどは除外
  const targetPolls = polls.filter(p => !p.poll_type || ['daily_trend', 'seed', 'user'].includes(p.poll_type));
  if (targetPolls.length === 0) return undefined;

  const sortedPolls = [...targetPolls].sort((a, b) => a.id.localeCompare(b.id));
  const today = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(today.getTime() + jstOffset);
  const seed = jstDate.getUTCFullYear() * 10000 + (jstDate.getUTCMonth() + 1) * 100 + jstDate.getUTCDate();
  const index = seed % sortedPolls.length;
  return sortedPolls[index];
}

// 動的SEOメタデータ
export async function generateMetadata(): Promise<Metadata> {
  const trendPoll = await getLatestDailyPoll();
  const dailyTitle = trendPoll?.title || '今日のお題に投票しよう';
  const ogImageUrl = `https://www.nandemo-vote.com/api/og?title=${encodeURIComponent('なんでも総選挙')}`;

  return {
    title: 'なんでも総選挙 | みんなの意見が見える投票サイト',
    description: `【今日の一問】${dailyTitle} - 日常の些細な選択から究極の決断まで。みんなの投票で白黒つけよう！`,
    openGraph: {
      title: 'なんでも総選挙',
      description: `【今日の一問】${dailyTitle}`,
      siteName: 'なんでも総選挙',
      locale: 'ja_JP',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'なんでも総選挙',
      description: `【今日の一問】${dailyTitle}`,
      images: [ogImageUrl],
    },
  };
}

export default async function Home() {
  const challengePolls = await getRandomPolls(10);

  // トレンドお題を優先、なければ日付ベースのフォールバック
  let dailyPoll = await getLatestDailyPoll();
  if (!dailyPoll) {
    const allPolls = await getPolls();
    dailyPoll = getDateBasedPoll(allPolls);
  }


  return (
    <div className="container-responsive py-8 space-y-8">
      {/* Hero / Ad Space */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl min-h-[280px] flex items-center">
        {/* Background Image with Overlay */}
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            fill
            className="object-cover object-center transition-transform duration-1000 hover:scale-105"
            priority
          />
        </div>
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
      {/* 4つのアクションボタン */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

        {/* まるごと総選挙 */}
        <Link
          href="/marugoto"
          className="block bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm animate-pulse">
            {MARUGOTO_THEMES.find(t => t.isNew)?.title}追加！
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                <CheckCircle2 className="w-6 h-6 text-white relative z-10" />
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-blue-100 text-xs font-bold mb-0.5">📦 パッケージで楽しむ</p>
              <h2 className="text-base md:text-lg font-black truncate">まるごと総選挙</h2>
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

      {/* ランダム総選挙 - マージン追加 */}
      <div className="mt-8">
        <ChallengeMode initialPolls={challengePolls} />
      </div>

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
