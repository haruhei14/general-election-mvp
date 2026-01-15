'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';

interface ThemeRequest {
    id: string;
    request_text: string;
    source: string;
    status: string;
    created_at: string;
}

export default function AdminPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [status2, setStatus2] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    // Theme requests state
    const [requests, setRequests] = useState<ThemeRequest[]>([]);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [requestsError, setRequestsError] = useState<string | null>(null);

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

    const fetchRequests = async () => {
        setRequestsLoading(true);
        setRequestsError(null);

        try {
            const res = await fetch('/api/theme-request/list');

            if (!res.ok) {
                throw new Error('取得に失敗しました');
            }

            const data = await res.json();
            setRequests(data.requests || []);
        } catch (e) {
            setRequestsError('リクエストの取得に失敗しました');
            console.error(e);
        } finally {
            setRequestsLoading(false);
        }
    };

    return (
        <div className="container-responsive py-12 max-w-2xl space-y-6">
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

            {/* Theme Requests Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-orange-500" />
                        <h2 className="font-bold text-slate-700">お題リクエスト一覧</h2>
                    </div>
                    <button
                        onClick={fetchRequests}
                        disabled={requestsLoading}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 text-slate-500 ${requestsLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <p className="text-sm text-slate-500">
                    ユーザーからのテーマリクエストを確認できます。
                </p>

                {requests.length === 0 && !requestsLoading && !requestsError && (
                    <div className="text-center py-8 text-slate-400">
                        <p className="mb-2">まだデータを読み込んでいません</p>
                        <button
                            onClick={fetchRequests}
                            className="text-blue-600 font-bold text-sm hover:underline"
                        >
                            リクエストを読み込む
                        </button>
                    </div>
                )}

                {requestsError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                        {requestsError}
                    </div>
                )}

                {requests.length > 0 && (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {requests.map((req) => (
                            <div key={req.id} className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm text-slate-700 font-medium flex-grow">
                                        {req.request_text}
                                    </p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        req.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {req.status === 'pending' ? '未対応' :
                                            req.status === 'reviewed' ? '確認済' : '実装済'}
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-slate-400">
                                    {new Date(req.created_at).toLocaleString('ja-JP')} • {req.source}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
