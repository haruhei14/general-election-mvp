import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';

export const metadata = {
    title: 'お問い合わせ | なんでも総選挙',
    description: 'なんでも総選挙へのお問い合わせページです。ご質問、ご意見、不具合報告などお気軽にご連絡ください。',
};

export default function ContactPage() {
    return (
        <div className="container-responsive py-12 max-w-2xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                ホームへ戻る
            </Link>

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-4">お問い合わせ</h1>
                <p className="text-slate-600">
                    ご質問、ご意見、不具合報告など、お気軽にご連絡ください。
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8 md:p-12 text-center space-y-8">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">メールでのお問い合わせ</h2>
                    <p className="text-slate-600 mb-6">
                        以下のメールアドレスまでお問い合わせください。通常、3営業日以内にご返信いたします。
                    </p>
                    <a
                        href="mailto:haruhe14@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        <Mail className="w-5 h-5" />
                        haruhe14@gmail.com
                    </a>

                </div>

                <hr className="border-slate-100" />

                <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">お問い合わせの際のお願い</h2>
                    <ul className="text-slate-600 text-left space-y-2 max-w-md mx-auto">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>件名に「なんでも総選挙」と明記してください</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>不具合報告の場合は、発生状況や端末情報をできるだけ詳しくお知らせください</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>返信用のメールアドレスをお間違えのないようご確認ください</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl text-center">
                <p className="text-slate-500 text-sm leading-relaxed">
                    お問い合わせ内容によっては、返信にお時間をいただく場合がございます。また、すべてのお問い合わせに返信をお約束するものではございませんので、予めご了承ください。
                </p>
            </div>
        </div>
    );
}
