import Link from 'next/link';
import { ArrowLeft, Vote, Heart, Users, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'サイトについて | なんでも総選挙',
    description: 'なんでも総選挙は、誰もが自由に選挙（ランキング）を作成し、意見を共有できるプラットフォームです。',
    openGraph: {
        title: 'サイトについて | なんでも総選挙',
        description: 'なんでも総選挙は、誰もが自由に選挙を作成し、意見を共有できるプラットフォームです。',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=サイトについて', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=サイトについて'],
    },
};

export default function AboutPage() {
    return (
        <div className="container-responsive py-8 md:py-12 max-w-3xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 md:mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                ホームへ戻る
            </Link>

            {/* Hero */}
            <div className="text-center mb-12 md:mb-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl md:rounded-3xl mb-5 md:mb-6 shadow-xl">
                    <Vote className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-3 md:mb-4">
                    なんでも総選挙
                </h1>
                <p className="text-lg md:text-xl text-slate-600">
                    みんなの「普通」を可視化する。
                </p>
            </div>

            {/* Mission */}
            <section className="mb-12 md:mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border border-blue-100">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-5 md:mb-6 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                        私たちの想い
                    </h2>
                    <div className="space-y-4 md:space-y-5 text-slate-700 text-sm md:text-base leading-relaxed md:leading-loose">
                        <p>
                            「唐揚げにレモンをかける？かけない？」「朝ごはんはパン派？ごはん派？」
                        </p>
                        <p>
                            日常の中で何気なく交わされる、こんな会話。実は、私たちの価値観や考え方を映し出す小さな鏡なのかもしれません。
                        </p>
                        <p>
                            <strong>「なんでも総選挙」</strong>は、そんな日常の「選択」を楽しく可視化するプラットフォームです。
                        </p>
                        <p>
                            自分の意見を投票し、みんなの結果を見る。「自分って多数派だったんだ！」という発見や、「こんな考え方もあるんだ」という気づきが、きっとあなたの毎日を少しだけ面白くしてくれるはずです。
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="mb-12 md:mb-16 px-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 md:mb-8 text-center">
                    大切にしていること
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
                            <Heart className="w-7 h-7 md:w-8 md:h-8 text-pink-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-base md:text-lg mb-2 md:mb-3">楽しさ第一</h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                            難しいことは抜きにして、純粋に楽しめるサービスを目指しています。
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
                            <Users className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-base md:text-lg mb-2 md:mb-3">みんなで作る</h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                            ユーザーの皆さんがお題を作成し、一緒にサービスを育てていきます。
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm text-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
                            <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-base md:text-lg mb-2 md:mb-3">新しい発見</h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                            投票を通じて、自分や社会について新しい発見ができる場所に。
                        </p>
                    </div>
                </div>
            </section>

            {/* Site Info */}
            <section className="mb-12 md:mb-16">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-5 md:mb-6">運営者情報</h2>
                <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 border border-slate-100 shadow-sm">
                    <dl className="space-y-4 md:space-y-5">
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <dt className="font-bold text-slate-500 text-sm md:text-base md:w-36 mb-1 md:mb-0">サイト名</dt>
                            <dd className="text-slate-800 text-sm md:text-base">なんでも総選挙</dd>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <dt className="font-bold text-slate-500 text-sm md:text-base md:w-36 mb-1 md:mb-0">URL</dt>
                            <dd className="text-slate-800 text-sm md:text-base break-all">https://nandemo-sousenkyo.vercel.app</dd>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <dt className="font-bold text-slate-500 text-sm md:text-base md:w-36 mb-1 md:mb-0">お問い合わせ</dt>
                            <dd className="text-sm md:text-base">
                                <Link href="/contact" className="text-blue-600 hover:underline">
                                    お問い合わせページ
                                </Link>
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center px-4">
                <p className="text-slate-600 mb-5 md:mb-6">
                    さあ、あなたも投票してみませんか？
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-blue-700 transition-all shadow-lg text-sm md:text-base"
                >
                    <Vote className="w-5 h-5" />
                    投票してみる
                </Link>
            </div>
        </div>
    );
}
