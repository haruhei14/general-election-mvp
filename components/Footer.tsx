import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-100 mt-20">
            <div className="container-responsive py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-black text-slate-800 text-lg mb-2">なんでも総選挙</h3>
                        <p className="text-sm text-slate-500">
                            みんなの「普通」を可視化する。<br />
                            日常の選択を楽しく投票しよう。
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-slate-700 text-sm mb-4">メニュー</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/polls" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    お題一覧
                                </Link>
                            </li>
                            <li>
                                <Link href="/ranking" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    人気ランキング
                                </Link>
                            </li>
                            <li>
                                <Link href="/poll/create" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    お題を作成
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-slate-700 text-sm mb-4">サイト情報</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    サイトについて
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} なんでも総選挙 All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
