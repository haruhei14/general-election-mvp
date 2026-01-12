import Link from 'next/link';

export default function CreatePollPage() {
    return (
        <div className="container-responsive py-20 text-center">
            <div className="max-w-2xl mx-auto card-premium p-12 bg-white">
                <h1 className="text-3xl font-bold mb-6">投票を作成する</h1>
                <p className="text-slate-600 mb-8">
                    「なんでも総選挙」へようこそ！<br />
                    現在、ユーザーによるお題追加機能は開発中です。
                </p>
                <div className="bg-blue-50 text-blue-700 p-6 rounded-xl border border-blue-100 mb-8">
                    <p className="text-sm">
                        MVPリリース後は、どなたでも自由にお題を作成し、コミュニティと共有できるようになります。<br />
                        まずは既存のお題への投票をお楽しみください！
                    </p>
                </div>
                <Link
                    href="/"
                    className="btn-gradient px-8 py-3 rounded-full font-bold inline-block"
                >
                    ホームに戻る
                </Link>
            </div>
        </div>
    );
}
