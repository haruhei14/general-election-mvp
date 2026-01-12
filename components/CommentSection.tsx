'use client';

import { Comment } from '@/lib/data';
import { submitComment } from '@/lib/actions';
import { User, Send, ThumbsUp } from 'lucide-react';
import { useRef, useState } from 'react';

export function CommentSection({ pollId, comments }: { pollId: string, comments: Comment[] }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await submitComment(formData);
            formRef.current?.reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
                    <User className="w-5 h-5" />
                </span>
                みんなのコメント
                <span className="text-sm font-normal text-slate-400 ml-2">({comments.length})</span>
            </h3>

            <div className="mb-8">
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input type="hidden" name="pollId" value={pollId} />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                name="author"
                                placeholder="名前 (任意)"
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <textarea
                                name="text"
                                required
                                placeholder="意見や感想をコメント... (必須)"
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-gradient px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            投稿する
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-6">
                {comments.length > 0 ? comments.map(comment => (
                    <div key={comment.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-slate-700">{comment.author || '名無し'}</span>
                                    <span className="text-xs text-slate-400">{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                                <div className="bg-slate-50 rounded-r-2xl rounded-bl-2xl p-4 text-slate-700 leading-relaxed text-sm">
                                    {comment.text}
                                </div>
                                <div className="flex items-center gap-4 mt-2 ml-1">
                                    <button className="text-slate-400 hover:text-blue-500 flex items-center gap-1 text-xs transition-colors">
                                        <ThumbsUp className="w-3 h-3" />
                                        いいね ({comment.likes})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed">
                        まだコメントはありません。最初のコメントを投稿しよう！
                    </div>
                )}
            </div>
        </div>
    );
}
