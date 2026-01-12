'use client';

import { GENRES } from '@/lib/data';
import { submitPoll } from '@/lib/actions';
import { PlusCircle, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePollPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const id = await submitPoll(formData);
            router.push(`/poll/${id}`);
        } catch (e: any) {
            alert(e.message || '作成に失敗しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                ホームに戻る
            </Link>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50" />

                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <PlusCircle className="text-blue-600 w-8 h-8" />
                    新しい総選挙を始める
                </h1>
                <p className="text-slate-500 mb-10">
                    みんなが気になるお題を作成して、意見を聞いてみよう！
                </p>

                <form action={handleSubmit} className="space-y-8">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            お題のタイトル <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            required
                            placeholder="例: きのこの山 vs たけのこの里"
                            className="w-full text-lg font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            ジャンル <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="genre"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                        >
                            <option value="">選択してください</option>
                            {GENRES.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                選択肢 A <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="option1"
                                required
                                placeholder="例: きのこの山"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                選択肢 B <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="option2"
                                required
                                placeholder="例: たけのこの里"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            詳細（補足説明・任意）
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="投票の背景やルールなど..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Visual Preview Info */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm mb-1">
                                OG画像を自動生成します
                            </h4>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                作成が完了すると、このお題専用のSNS共有用画像が自動的に作成されます。
                                最新の投票結果が反映された画像がリンクされるため、拡散に最適です。
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-gradient py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                        >
                            {isSubmitting ? '作成中...' : '総選挙を開始する'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
