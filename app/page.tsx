import { getRandomPolls } from '@/lib/data';
import { AdSense } from '@/components/AdSense';
import { ChallengeMode } from '@/components/ChallengeMode';

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

      {/* Today's Challenge - Main Focus */}
      <ChallengeMode initialPolls={challengePolls} />

      {/* Footer Ad */}
      <AdSense type="responsive" className="mt-12" />
    </div>
  );
}
