'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="container-responsive py-12 max-w-lg">
            <h1 className="text-2xl font-black text-slate-800 mb-8">🔧 管理ページ</h1>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-700">20問一括登録</h2>
                <p className="text-sm text-slate-500">
                    MVPの20問をデータベースに登録します。既に登録済みのお題はスキップされます。
                </p>

                <button
                    onClick={handleSeed}
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                    {isLoading ? '登録中...' : '20問を登録する'}
                </button>

                {status && (
                    <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
