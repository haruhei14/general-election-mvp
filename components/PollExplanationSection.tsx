'use client';

import { useState } from 'react';
import { Poll } from '@/lib/data';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, History, Brain, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// お題のジャンルに応じた解説を生成
function getExplanationContent(poll: Poll) {
    const genre = poll.genre || 'その他';

    // ジャンル別のテンプレート解説
    const explanations: Record<string, { background: string; psychology: string; modern: string; trivia: string }> = {
        '食べ物': {
            background: '食の好みは、私たちの成長環境や文化的背景を映し出す鏡です。幼少期の食体験は味覚の形成に大きな影響を与え、「おふくろの味」として記憶に刻まれます。また、地域によって同じ料理でも味付けや食べ方が異なることは、日本の食文化の豊かさを示しています。現代では、SNSによる「映え」文化も食の選択に影響を与えています。',
            psychology: '食べ物の好みは単なる味覚だけでなく、心理的な安心感や過去の記憶と結びついています。コンフォートフードと呼ばれる「心が落ち着く食べ物」は、ストレス時に選ばれやすく、これは食と感情の深い結びつきを示しています。また、新しい食べ物に挑戦するかどうかは、性格特性の「開放性」とも関連があります。',
            modern: '健康志向の高まりにより、食の選択はますます個人化しています。グルテンフリー、ヴィーガン、低糖質など、様々な食スタイルが認知されるようになりました。一方で、「推し活」としての食べ歩きや、地域限定グルメを求める旅行も人気です。',
            trivia: '日本人が1年間に消費するお米は約50kg。これは50年前の半分以下で、代わりにパンや麺類の消費が増えています。また、世界で最も外食産業が発達している国の一つが日本で、コンビニおにぎりの年間販売数は約22億個にも上ります。'
        },
        'エンタメ': {
            background: 'エンターテインメントは人類の歴史とともに発展してきました。口承文学から始まり、印刷技術、映画、テレビ、そしてインターネットへ。各時代の技術革新が新しい娯楽の形を生み出してきました。日本は特にアニメ、漫画、ゲームにおいて世界をリードする存在となっています。',
            psychology: '好きなエンタメコンテンツは、その人の価値観や感情的ニーズを反映します。ファンタジー作品を好む人は想像力が豊かで、現実からの逃避を求める傾向があるとされます。一方、リアリティショーを好む人は社会的関係への興味が高いという研究もあります。「推し活」は帰属意識と自己表現の両方を満たす活動と言えるでしょう。',
            modern: 'サブスクリプションサービスの普及により、コンテンツ消費の形が劇的に変化しました。「一気見」という新しい視聴スタイルが生まれ、TikTokのような短尺動画も台頭。しかし同時に、長時間没入できる作品への需要も根強く、コンテンツの二極化が進んでいます。',
            trivia: '日本のアニメ産業の市場規模は約2.5兆円で、海外売上が国内を上回っています。また、世界で最も売れた単一作品の漫画は「ONE PIECE」で、累計発行部数は5億部を超えています。'
        },
        '日常・生活': {
            background: '日常生活の小さな習慣や選択は、実は深い文化的・歴史的背景を持っています。例えば、入浴の習慣は日本独特のもので、世界的に見ると毎日湯船に浸かる国は少数派です。こうした日常の「当たり前」こそが、その社会の価値観を最も端的に表しています。',
            psychology: '日常のルーティンは心理的な安定感をもたらします。朝のコーヒー、夜の入浴など、決まったパターンがあることで脳は安心し、他の重要な判断にエネルギーを割くことができます。これを「決定疲れ」の軽減と呼びます。スティーブ・ジョブズが同じ服を着続けたのも、この理由からでした。',
            modern: 'リモートワークの普及により、通勤という「儀式」がなくなり、オンとオフの切り替えに苦労する人が増えています。その結果、モーニングルーティンやナイトルーティンへの関心が高まり、YouTubeでは「vlog」として日常を共有するコンテンツが人気を集めています。',
            trivia: '日本人の平均睡眠時間は約7時間22分で、OECD加盟国の中で最も短いです。また、日本人が1日にスマホを触る回数は平均約150回、使用時間は約3時間と言われています。'
        }
    };

    // デフォルトの解説
    const defaultExplanation = {
        background: 'この質問は、私たちの日常における価値観や選好を映し出します。一見些細な選択に見えても、その背景には文化や育ち、個人の経験が反映されています。こうした「普通」の違いを知ることは、多様性を理解する第一歩となります。',
        psychology: '人は自分の選択が「正しい」と感じたい心理があります。これを「確証バイアス」と呼び、自分と同じ意見の人が多いと安心する傾向があります。一方で、少数派であることに独自性を見出す人もいます。どちらの反応も、社会的アイデンティティの形成に関わっています。',
        modern: 'SNSの普及により、人々の意見や好みが可視化されやすくなりました。「いいね」の数や投票結果を通じて、自分が多数派なのか少数派なのかを即座に知ることができます。これは社会的な一体感を生む一方で、同調圧力を強める側面もあります。',
        trivia: '日本人は世界的に見ても「周りに合わせる」傾向が強いとされますが、実際の調査では意外と個人差が大きいことがわかっています。また、世代によって価値観は大きく異なり、Z世代は上の世代よりも個人の選択を尊重する傾向があります。'
    };

    return explanations[genre] || defaultExplanation;
}

export function PollExplanationSection({ poll }: { poll: Poll }) {
    const [isOpen, setIsOpen] = useState(false);
    const explanation = getExplanationContent(poll);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header - クリックでアコーディオン開閉 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 md:p-6 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
            >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                    <p className="text-orange-600 text-xs font-bold mb-1">📚 深掘りコンテンツ</p>
                    <h3 className="text-lg font-black text-slate-800">
                        このお題の豆知識・解説
                    </h3>
                </div>
                <div className={cn(
                    "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform flex-shrink-0",
                    isOpen && "rotate-180"
                )}>
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                </div>
            </button>

            {/* 展開コンテンツ */}
            {isOpen && (
                <div className="px-5 md:px-8 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-slate-100 pt-6 space-y-6">
                        <ExplanationBlock
                            icon={<History className="w-5 h-5 text-amber-500" />}
                            title="背景と歴史"
                            content={explanation.background}
                        />
                        <ExplanationBlock
                            icon={<Brain className="w-5 h-5 text-violet-500" />}
                            title="心理学的視点"
                            content={explanation.psychology}
                        />
                        <ExplanationBlock
                            icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
                            title="現代の傾向"
                            content={explanation.modern}
                        />
                        <ExplanationBlock
                            icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
                            title="豆知識"
                            content={explanation.trivia}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function ExplanationBlock({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
    return (
        <div className="bg-slate-50 rounded-xl p-4 md:p-5">
            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 text-sm">
                {icon}
                {title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
                {content}
            </p>
        </div>
    );
}
