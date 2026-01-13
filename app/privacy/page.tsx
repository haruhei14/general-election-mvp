import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'プライバシーポリシー | なんでも総選挙',
    description: 'なんでも総選挙のプライバシーポリシーです。個人情報の取り扱い、Cookie、広告配信について説明しています。',
};

export default function PrivacyPage() {
    return (
        <div className="container-responsive py-12 max-w-3xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                ホームへ戻る
            </Link>

            <article className="prose prose-slate max-w-none">
                <h1 className="text-3xl font-black text-slate-800 mb-8">プライバシーポリシー</h1>

                <p className="text-slate-600 mb-8">
                    「なんでも総選挙」（以下、「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">1. 個人情報の収集について</h2>
                    <p className="text-slate-600">
                        当サイトでは、お問い合わせの際にメールアドレス等の個人情報をご提供いただく場合があります。
                        これらの情報は、お問い合わせへの返答や、サービス向上の目的以外には使用いたしません。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">2. 投票データの取り扱いについて</h2>
                    <p className="text-slate-600">
                        当サイトでは、投票機能を提供しています。投票データはブラウザのローカルストレージに保存され、
                        サーバー側では個人を特定できる情報と紐づけて保存することはありません。
                        投票結果は集計データとして表示されますが、個人の投票内容が第三者に公開されることはありません。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">3. Cookieの使用について</h2>
                    <p className="text-slate-600">
                        当サイトでは、ユーザーエクスペリエンス向上のためにCookieを使用しています。
                        Cookieとは、ウェブサイトがユーザーのコンピュータに保存する小さなテキストファイルです。
                        ブラウザの設定によりCookieの受け入れを拒否することも可能ですが、
                        一部の機能が正常に動作しなくなる可能性があります。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">4. 広告配信について</h2>
                    <p className="text-slate-600 mb-4">
                        当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
                    </p>
                    <p className="text-slate-600 mb-4">
                        広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
                        Googleによる広告Cookieの使用については、
                        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Google広告に関するポリシー
                        </a>
                        をご確認ください。
                    </p>
                    <p className="text-slate-600">
                        ユーザーは、Googleの広告設定ページにて、パーソナライズ広告を無効にすることができます。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">5. アクセス解析について</h2>
                    <p className="text-slate-600">
                        当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。
                        Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
                        このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                        詳細は
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Googleプライバシーポリシー
                        </a>
                        をご確認ください。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">6. プライバシーポリシーの変更</h2>
                    <p className="text-slate-600">
                        当サイトは、必要に応じてプライバシーポリシーを変更することがあります。
                        変更後のプライバシーポリシーは、当ページに掲載した時点で効力を生じるものとします。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">7. お問い合わせ</h2>
                    <p className="text-slate-600">
                        プライバシーポリシーに関するお問い合わせは、
                        <Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>
                        よりご連絡ください。
                    </p>
                </section>

                <p className="text-slate-400 text-sm mt-12">
                    制定日：2026年1月13日
                </p>
            </article>
        </div>
    );
}
