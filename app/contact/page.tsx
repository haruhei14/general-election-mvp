import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お問い合わせ | なんでも総選挙',
    description: 'なんでも総選挙へのお問い合わせページです。ご質問、ご意見、不具合報告などお気軽にご連絡ください。',
    openGraph: {
        title: 'お問い合わせ | なんでも総選挙',
        description: 'なんでも総選挙へのお問い合わせページです。',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=お問い合わせ', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=お問い合わせ'],
    },
};

export default function ContactPage() {
    return (
        <div className="container-responsive py-8 md:py-12 max-w-2xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 md:mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                ホームへ戻る
            </Link>

            <div className="text-center mb-10 md:mb-12 px-4">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl md:rounded-2xl mb-5 md:mb-6">
                    <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 md:mb-4">お問い合わせ</h1>
                <p className="text-slate-600 text-sm md:text-base">
                    ご質問、ご意見、不具合報告など、お気軽にご連絡ください。
                </p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-lg p-6 md:p-10 lg:p-12 text-center space-y-8 md:space-y-10">
                <div>
                    <h2 className="text-base md:text-lg font-bold text-slate-800 mb-3 md:mb-4">メールでのお問い合わせ</h2>
                    <p className="text-slate-500 text-sm md:text-base mb-5 md:mb-6 leading-relaxed">
                        以下のメールアドレスまでお問い合わせください。通常、3営業日以内にご返信いたします。
                    </p>
                    <a
                        href="mailto:haruhe14@gmail.com"
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-sm md:text-base"
                    >
                        <Mail className="w-5 h-5" />
                        haruhe14@gmail.com
                    </a>
                </div>

                <hr className="border-slate-100" />

                <div>
                    <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4 md:mb-5">お問い合わせの際のお願い</h2>
                    <ul className="text-slate-500 text-left text-sm md:text-base space-y-3 max-w-md mx-auto leading-relaxed">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                            <span>件名に「なんでも総選挙」と明記してください</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                            <span>不具合報告の場合は、発生状況や端末情報をできるだけ詳しくお知らせください</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                            <span>返信用のメールアドレスをお間違えのないようご確認ください</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 md:mt-8 p-5 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl text-center">
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    お問い合わせ内容によっては、返信にお時間をいただく場合がございます。また、すべてのお問い合わせに返信をお約束するものではございませんので、予めご了承ください。
                </p>
            </div>
        </div>
    );
}
