import { getRandomPolls } from '@/lib/data';
import { AdSense } from '@/components/AdSense';
import { ChallengeMode } from '@/components/ChallengeMode';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';

export default async function Home() {
  const challengePolls = await getRandomPolls(10);

  return (
    <div className="container-responsive py-8 space-y-12">
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

      {/* 価値観診断バナー */}
      <Link
        href="/diagnosis"
        className="block bg-gradient-to-r from-violet-500 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <p className="text-violet-100 text-xs md:text-sm font-bold mb-1">🧠 10問であなたを分析</p>
              <h2 className="text-lg md:text-2xl font-black">価値観診断をやってみる</h2>
              <p className="text-violet-200 text-xs md:text-sm mt-1 hidden md:block">
                日常の選択であなたのタイプを診断。結果をシェアしよう！
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </div>
      </Link>

      {/* Today's Challenge - Main Focus */}
      <ChallengeMode initialPolls={challengePolls} />

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
