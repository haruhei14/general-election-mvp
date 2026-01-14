'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [status2, setStatus2] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const handleSeed = async () => {
        setIsLoading(true);
        setStatus('登録中...');

        try {
            const res = await fetch('/api/seed-polls', { method: 'POST' });
            const data = await res.json();
            setStatus(`✅ 完了！ ${data.message}`);
            console.log(data.results);
        } catch (e) {
            setStatus('❌ エラーが発生しました');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeedV2 = async () => {
        setIsLoading2(true);
        setStatus2('登録中...');

        try {
            const res = await fetch('/api/seed-polls-v2', { method: 'POST' });
            const data = await res.json();
            setStatus2(`✅ 完了！ ${data.message}`);
            console.log(data.results);
        } catch (e) {
            setStatus2('❌ エラーが発生しました');
            console.error(e);
        } finally {
            setIsLoading2(false);
        }
    };

    return (
        <div className="container-responsive py-12 max-w-lg space-y-6">
            <h1 className="text-2xl font-black text-slate-800 mb-8">🔧 管理ページ</h1>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-700">ベースデータ登録（第1弾 + まるごと総選挙）</h2>
                <p className="text-sm text-slate-500">
                    MVP30問および「まるごと総選挙（ワンピース）」のデータを登録・更新します。
                </p>

                <button
                    onClick={handleSeed}
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                    {isLoading ? '登録中...' : 'データを同期する'}
                </button>

                {status && (
                    <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium">
                        {status}
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-700">第2弾：30問追加登録</h2>
                <p className="text-sm text-slate-500">
                    追加の30問をデータベースに登録します。各問5〜10個の選択肢があります。
                </p>

                <button
                    onClick={handleSeedV2}
                    disabled={isLoading2}
                    className="w-full py-3 px-6 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                    {isLoading2 ? '登録中...' : '第2弾を登録する'}
                </button>

                {status2 && (
                    <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium">
                        {status2}
                    </div>
                )}
            </div>
        </div>
    );
}
