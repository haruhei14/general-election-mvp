'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Trophy, Users, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { DIAGNOSIS_QUESTIONS, getDiagnosisType, DiagnosisType } from '../data';
import { cn } from '@/lib/utils';

type Answer = {
    questionId: string;
    optionId: string;
    score: number;
};

export default function DiagnosisResultPage() {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [diagnosisType, setDiagnosisType] = useState<DiagnosisType | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('diagnosis_answers');
        if (stored) {
            const parsedAnswers = JSON.parse(stored) as Answer[];
            setAnswers(parsedAnswers);
            const scores = parsedAnswers.map(a => a.score);
            setDiagnosisType(getDiagnosisType(scores));
        }
    }, []);

    if (!isMounted || !diagnosisType || answers.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500">結果を読み込んでいます...</p>
                </div>
            </div>
        );
    }

    // 多数派/少数派の判定（仮のロジック、実際は投票データと連携）
    const getMajorityLabel = (score: number): { label: string; isMajority: boolean } => {
        // スコア2-3が多数派の傾向（中間的な選択が多い）
        const isMajority = score === 2 || score === 3;
        return {
            label: isMajority ? '多数派' : '少数派',
            isMajority
        };
    };

    const shareText = `【価値観診断】私は「${diagnosisType.emoji} ${diagnosisType.name}」タイプでした！\n\n${diagnosisType.shortDescription}\n\n#なんでも総選挙 #価値観診断`;
    const shareUrl = 'https://nandemo-sousenkyo.vercel.app/diagnosis';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="container-responsive py-6 md:py-10 max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        ホームへ
                    </Link>
                    <Link
                        href="/diagnosis"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-bold text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        もう一度診断
                    </Link>
                </div>

                {/* 診断結果カード */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 text-center text-white">
                        <p className="text-blue-100 font-bold text-sm mb-4">あなたの診断結果</p>
                        <div className="text-6xl md:text-8xl mb-4">{diagnosisType.emoji}</div>
                        <h2 className="text-3xl md:text-4xl font-black mb-2">{diagnosisType.name}</h2>
                        <p className="text-blue-100">{diagnosisType.shortDescription}</p>
                    </div>

                    <div className="p-6 md:p-10">
                        {/* 診断結果の詳細 */}
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                あなたの特徴
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {diagnosisType.fullDescription}
                            </p>
                        </div>

                        {/* 強み */}
                        <div className="mb-8">
                            <h3 className="font-bold text-slate-800 text-lg mb-4">✨ あなたの強み</h3>
                            <div className="flex flex-wrap gap-2">
                                {diagnosisType.strengths.map((strength, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm"
                                    >
                                        {strength}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* アドバイス */}
                        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                            <h3 className="font-bold text-amber-800 text-sm mb-2">💡 ワンポイントアドバイス</h3>
                            <p className="text-amber-700 text-sm leading-relaxed">
                                {diagnosisType.tips}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 広告プレースホルダー 1 */}
                <div className="bg-slate-100 rounded-xl p-8 text-center text-slate-400 text-sm mb-8 border-2 border-dashed border-slate-200">
                    📢 広告スペース
                </div>

                {/* 回答一覧 */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden mb-8">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            あなたの回答一覧
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">10問の回答結果と、みんなの傾向</p>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {answers.map((answer, idx) => {
                            const question = DIAGNOSIS_QUESTIONS.find(q => q.id === answer.questionId);
                            const selectedOption = question?.options.find(o => o.id === answer.optionId);
                            const majority = getMajorityLabel(answer.score);

                            return (
                                <div key={answer.questionId} className="p-5">
                                    <div className="flex items-start gap-4">
                                        <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-500 flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <div className="flex-grow">
                                            <p className="text-slate-700 font-bold text-sm mb-2">
                                                {question?.question}
                                            </p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                                                    {selectedOption?.label}
                                                </span>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-xs font-bold",
                                                    majority.isMajority
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-orange-100 text-orange-600"
                                                )}>
                                                    {majority.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 広告プレースホルダー 2 */}
                <div className="bg-slate-100 rounded-xl p-8 text-center text-slate-400 text-sm mb-8 border-2 border-dashed border-slate-200">
                    📢 広告スペース
                </div>

                {/* シェアボタン */}
                <div className="text-center space-y-4">
                    <p className="text-slate-600 font-bold">診断結果をシェアしよう！</p>
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                    >
                        <Share2 className="w-5 h-5" />
                        Xでシェア
                    </a>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 mb-4">もっと投票してみよう！</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg"
                    >
                        <Trophy className="w-5 h-5" />
                        他のお題に投票する
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
