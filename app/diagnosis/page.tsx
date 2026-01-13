'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, ChevronUp, BookOpen, Brain, Lightbulb, History } from 'lucide-react';
import { DIAGNOSIS_QUESTIONS, DiagnosisQuestion } from './data';
import { cn } from '@/lib/utils';

export default function DiagnosisPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: string; optionId: string; score: number }[]>([]);
    const [isExplanationOpen, setIsExplanationOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentQuestion = DIAGNOSIS_QUESTIONS[currentIndex];
    const progress = ((currentIndex) / DIAGNOSIS_QUESTIONS.length) * 100;

    // ページタイトルを設定
    useEffect(() => {
        document.title = `価値観診断（${currentIndex + 1}/10）｜なんでも総選挙`;
    }, [currentIndex]);

    const handleAnswer = (optionId: string, score: number) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // 回答を保存
        const newAnswers = [...answers, {
            questionId: currentQuestion.id,
            optionId,
            score
        }];
        setAnswers(newAnswers);

        // 少し待ってから次へ
        setTimeout(() => {
            if (currentIndex < DIAGNOSIS_QUESTIONS.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setIsExplanationOpen(false);
                setIsAnimating(false);
            } else {
                // 回答を保存して結果ページへ
                localStorage.setItem('diagnosis_answers', JSON.stringify(newAnswers));
                router.push('/diagnosis/result');
            }
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container-responsive py-6 md:py-10 max-w-2xl">
                {/* Progress Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-slate-500">
                            質問 {currentIndex + 1} / {DIAGNOSIS_QUESTIONS.length}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                            {Math.round(progress)}% 完了
                        </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div
                    className={cn(
                        "bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300",
                        isAnimating && "opacity-50 scale-[0.98]"
                    )}
                >
                    {/* Question */}
                    <div className="p-6 md:p-10 text-center">
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="px-4 md:px-8 pb-6 md:pb-10 space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(option.id, option.score)}
                                disabled={isAnimating}
                                className="w-full p-4 md:p-5 bg-slate-50 hover:bg-blue-50 border-2 border-slate-100 hover:border-blue-300 rounded-xl text-left font-bold text-slate-700 hover:text-blue-700 transition-all group flex items-center justify-between disabled:opacity-50"
                            >
                                <span>{option.label}</span>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Explanation Accordion */}
                <div className="mt-6">
                    <button
                        onClick={() => setIsExplanationOpen(!isExplanationOpen)}
                        className="w-full p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-slate-700 text-sm md:text-base">📚 この質問について深掘り</span>
                        </div>
                        {isExplanationOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                    </button>

                    {isExplanationOpen && (
                        <div className="mt-2 bg-white rounded-xl border border-slate-200 p-5 md:p-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            <ExplanationSection
                                icon={<History className="w-5 h-5 text-amber-500" />}
                                title="背景と歴史"
                                content={currentQuestion.explanation.background}
                            />
                            <ExplanationSection
                                icon={<Brain className="w-5 h-5 text-violet-500" />}
                                title="心理学的視点"
                                content={currentQuestion.explanation.psychology}
                            />
                            <ExplanationSection
                                icon={<ChevronRight className="w-5 h-5 text-blue-500" />}
                                title="現代の傾向"
                                content={currentQuestion.explanation.modern}
                            />
                            <ExplanationSection
                                icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}
                                title="豆知識"
                                content={currentQuestion.explanation.trivia}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ExplanationSection({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
    return (
        <div>
            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                {icon}
                {title}
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {content}
            </p>
        </div>
    );
}
