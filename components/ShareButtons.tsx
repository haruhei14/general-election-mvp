'use client';

import { useState } from 'react';

interface ShareButtonsProps {
    pollId: string;
    pollTitle: string;
}

/**
 * SNSシェアボタンコンポーネント
 * Twitter、LINE、URLコピー機能を提供
 */
export function ShareButtons({ pollId, pollTitle }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // 現在のページURLを取得
    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return `https://www.nandemo-vote.com/poll/${pollId}`;
    };

    // X (Twitter) でシェア
    const shareOnTwitter = () => {
        const url = getShareUrl();
        const text = `「${pollTitle}」に投票しました！あなたも参加してみて🗳️`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    };

    // LINEでシェア
    const shareOnLine = () => {
        const url = getShareUrl();
        const text = `「${pollTitle}」に投票しました！あなたも参加してみて🗳️`;
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(lineUrl, '_blank', 'width=600,height=400');
    };

    // URLをコピー
    const copyUrl = async () => {
        const url = getShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // フォールバック：古いブラウザ対応
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={shareOnTwitter}
                className="w-full bg-[#1DA1F2] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
                X (Twitter) で投稿
            </button>
            <button
                onClick={shareOnLine}
                className="w-full bg-[#06C755] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
                LINEで送る
            </button>
            <button
                onClick={copyUrl}
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
                {copied ? '✓ コピーしました！' : 'URLをコピー'}
            </button>
        </div>
    );
}
