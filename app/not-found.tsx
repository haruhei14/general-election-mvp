import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container-responsive py-20 min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                <h1 className="relative text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 select-none">
                    404
                </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                お探しのページは見つかりませんでした
            </h2>

            <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
                アクセスしようとしたページは、削除されたかURLが変更されている可能性があります。<br className="hidden sm:block" />
                新しいお題を探してみませんか？
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    <Home className="w-5 h-5" />
                    トップページへ戻る
                </Link>
                <Link
                    href="/polls"
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all hover:shadow-md active:scale-95"
                >
                    <Search className="w-5 h-5" />
                    お題を探す
                </Link>
            </div>
        </div>
    );
}
