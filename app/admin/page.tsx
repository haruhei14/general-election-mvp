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

            {/* Social Media Tool Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🐦</span>
                    <h2 className="font-bold text-slate-700">半自動告知ツイート</h2>
                </div>
                <p className="text-sm text-slate-500">
                    最新の「今日の一問」を取得して、告知用の投稿を作成します。
                </p>

                <TweetGenerator />
            </div>
        </div>
    );
}

function TweetGenerator() {
    const [poll, setPoll] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchLatest = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/polls/latest-daily');
            const data = await res.json();
            setPoll(data.poll);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // 初期ロード
    useEffect(() => {
        fetchLatest();
    }, []);

    const handleTweet = () => {
        if (!poll) return;

        const baseUrl = 'https://www.nandemo-vote.com';
        const url = `${baseUrl}/poll/${poll.id}`;

        // ツイート本文の構築
        // 特にお題IDによるカスタム分岐があればここで調整可能
        let text = `【本日のお題】\n${poll.title}\n\n`;

        // 選択肢の上位2つを表示（あれば）
        if (poll.options && poll.options.length >= 2) {
            text += `🅰️ ${poll.options[0].label}\n🅱️ ${poll.options[1].label}\n\n`;
        }

        text += `どっち派？みんなで投票しよう！👇\n#なんでも総選挙 #今日の一問`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=500');
    };

    if (loading) return <div className="text-sm text-slate-500">読み込み中...</div>;
    if (!poll) return (
        <div>
            <p className="text-sm text-red-500 mb-2">お題が見つかりませんでした</p>
            <button onClick={fetchLatest} className="text-blue-600 text-sm underline">再読み込み</button>
        </div>
    );

    return (
        <div className="bg-slate-50 p-4 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg font-bold text-xs flex-shrink-0">
                    今日の一問
                </div>
                <div>
                    <h3 className="font-bold text-slate-700 text-sm">{poll.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{poll.description}</p>
                </div>
            </div>

            <button
                onClick={handleTweet}
                className="w-full py-3 bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                告知ツイートを作成する
            </button>
            <p className="text-[10px] text-slate-400 text-center">
                ※開いた画面で画像を追加したり文章を編集できます
            </p>
        </div>
    );
}
