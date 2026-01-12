'use client';

import { GENRES } from '@/lib/data';
import { submitPoll } from '@/lib/actions';
import { PlusCircle, Image as ImageIcon, ArrowLeft, Trash2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePollPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['', '']); // Start with 2 empty options
    const router = useRouter();

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

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

                {/* Safety Warning */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-10 flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="font-bold text-red-900 text-sm">投稿に関するご注意</h4>
                        <p className="text-xs text-red-700 leading-relaxed">
                            公序良俗に反する投稿（下ネタ、差別的な表現、特定の個人や団体への攻撃など）は固く禁止しています。
                            これらを含むお題や選択肢は自動フィルタによって作成できないほか、運営によって削除される場合があります。
                            みんなが楽しく参加できるお題づくりにご協力ください。
                        </p>
                    </div>
                </div>

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

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                            お題の画像URL（任意）
                        </label>
                        <input
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg (空欄でも自動生成画像が背景になります)"
                            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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

                    {/* Dynamic Options */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">
                            選択肢 <span className="text-slate-400 text-xs font-normal">（2〜10個）</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {options.map((option, idx) => (
                                <div key={idx} className="relative group">
                                    <input
                                        name={`option${idx + 1}`}
                                        required={idx < 2}
                                        placeholder={`選択肢 ${idx + 1}${idx < 2 ? ' *' : ''}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    {options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOption(idx)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {options.length < 10 && (
                            <button
                                type="button"
                                onClick={addOption}
                                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2 group"
                            >
                                <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                選択肢を追加する
                            </button>
                        )}
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
