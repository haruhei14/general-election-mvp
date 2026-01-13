import Link from 'next/link';
import { ArrowLeft, Vote, Heart, Users, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'サイトについて | なんでも総選挙',
    description: 'なんでも総選挙は、誰もが自由に選挙（ランキング）を作成し、意見を共有できるプラットフォームです。',
};

export default function AboutPage() {
    return (
        <div className="container-responsive py-12 max-w-3xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                ホームへ戻る
            </Link>

            {/* Hero */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-xl">
                    <Vote className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                    なんでも総選挙
                </h1>
                <p className="text-xl text-slate-600">
                    みんなの「普通」を可視化する。
                </p>
            </div>

            {/* Mission */}
            <section className="mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        私たちの想い
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                        <p>
                            「唐揚げにレモンをかける？かけない？」「朝ごはんはパン派？ごはん派？」
                        </p>
                        <p>
                            日常の中で何気なく交わされる、こんな会話。
                            実は、私たちの価値観や考え方を映し出す小さな鏡なのかもしれません。
                        </p>
                        <p>
                            <strong>「なんでも総選挙」</strong>は、そんな日常の「選択」を楽しく可視化するプラットフォームです。
                        </p>
                        <p>
                            自分の意見を投票し、みんなの結果を見る。
                            「自分って多数派だったんだ！」という発見や、
                            「こんな考え方もあるんだ」という気づきが、
                            きっとあなたの毎日を少しだけ面白くしてくれるはずです。
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="mb-16">
                <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">
                    大切にしていること
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-6 h-6 text-pink-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">楽しさ第一</h3>
                        <p className="text-sm text-slate-600">
                            難しいことは抜きにして、純粋に楽しめるサービスを目指しています。
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">みんなで作る</h3>
                        <p className="text-sm text-slate-600">
                            ユーザーの皆さんがお題を作成し、一緒にサービスを育てていきます。
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">新しい発見</h3>
                        <p className="text-sm text-slate-600">
                            投票を通じて、自分や社会について新しい発見ができる場所に。
                        </p>
                    </div>
                </div>
            </section>

            {/* Site Info */}
            <section className="mb-16">
                <h2 className="text-2xl font-black text-slate-800 mb-6">運営者情報</h2>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                    <dl className="space-y-4">
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <dt className="font-bold text-slate-600 md:w-32">サイト名</dt>
                            <dd className="text-slate-800">なんでも総選挙</dd>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <dt className="font-bold text-slate-600 md:w-32">URL</dt>
                            <dd className="text-slate-800">https://nandemo-sousenkyo.vercel.app</dd>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <dt className="font-bold text-slate-600 md:w-32">お問い合わせ</dt>
                            <dd className="text-slate-800">
                                <Link href="/contact" className="text-blue-600 hover:underline">
                                    お問い合わせページ
                                </Link>
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center">
                <p className="text-slate-600 mb-6">
                    さあ、あなたも投票してみませんか？
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
                >
                    <Vote className="w-5 h-5" />
                    投票してみる
                </Link>
            </div>
        </div>
    );
}
