'use client';

import { Comment } from '@/lib/data';
import { submitComment, likeCommentAction } from '@/lib/actions';
import { User, Send, ThumbsUp, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState, useOptimistic, useTransition } from 'react';
import { cn } from '@/lib/utils';

type CommentWithReplies = Comment & {
    replies?: Comment[];
};

export function CommentSection({ pollId, comments }: { pollId: string, comments: Comment[] }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

    // Group comments into parent and replies
    const parentComments = comments.filter(c => !c.parent_id);
    const repliesMap: Record<string, Comment[]> = {};
    comments.filter(c => c.parent_id).forEach(c => {
        if (!repliesMap[c.parent_id!]) repliesMap[c.parent_id!] = [];
        repliesMap[c.parent_id!].push(c);
    });

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await submitComment(formData);
            formRef.current?.reset();
            setReplyingTo(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleReplies = (commentId: string) => {
        setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
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

            {/* Main Comment Form */}
            {!replyingTo && (
                <div className="mb-8">
                    <CommentForm
                        formRef={formRef}
                        pollId={pollId}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                    />
                </div>
            )}

            <div className="space-y-6">
                {parentComments.length > 0 ? parentComments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        pollId={pollId}
                        replies={repliesMap[comment.id] || []}
                        showReplies={showReplies[comment.id]}
                        onToggleReplies={() => toggleReplies(comment.id)}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                    />
                )) : (
                    <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed">
                        まだコメントはありません。最初のコメントを投稿しよう！
                    </div>
                )}
            </div>
        </div>
    );
}

function CommentForm({
    formRef,
    pollId,
    isSubmitting,
    onSubmit,
    parentId,
    onCancel,
    placeholder = "意見や感想をコメント... (必須)"
}: {
    formRef?: React.RefObject<HTMLFormElement | null>;
    pollId: string;
    isSubmitting: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
    parentId?: string;
    onCancel?: () => void;
    placeholder?: string;
}) {
    const localRef = useRef<HTMLFormElement>(null);
    const ref = formRef || localRef;

    return (
        <form
            ref={ref}
            action={onSubmit}
            className="flex flex-col gap-3"
        >
            <input type="hidden" name="pollId" value={pollId} />
            {parentId && <input type="hidden" name="parentId" value={parentId} />}
            <input
                name="author"
                placeholder="名前 (任意)"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <textarea
                name="text"
                required
                placeholder={placeholder}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
            />
            <div className="flex justify-end gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        キャンセル
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient px-5 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 text-sm"
                >
                    <Send className="w-4 h-4" />
                    {parentId ? '返信する' : '投稿する'}
                </button>
            </div>
        </form>
    );
}

function CommentItem({
    comment,
    pollId,
    replies,
    showReplies,
    onToggleReplies,
    replyingTo,
    setReplyingTo,
    isSubmitting,
    onSubmit
}: {
    comment: Comment;
    pollId: string;
    replies: Comment[];
    showReplies: boolean;
    onToggleReplies: () => void;
    replyingTo: string | null;
    setReplyingTo: (id: string | null) => void;
    isSubmitting: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
}) {
    const [isPending, startTransition] = useTransition();
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(comment.likes);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = () => {
        if (hasLiked) return;
        setHasLiked(true);
        startTransition(async () => {
            setOptimisticLikes(prev => prev + 1);
            await likeCommentAction(comment.id, pollId);
        });
    };

    return (
        <div className="group animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-700">{comment.author || '名無し'}</span>
                        <span className="text-xs text-slate-400">{new Date(comment.created_at).toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-50 rounded-r-2xl rounded-bl-2xl p-4 text-slate-700 leading-relaxed text-sm">
                        {comment.text}
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-1">
                        <button
                            onClick={handleLike}
                            disabled={hasLiked || isPending}
                            className={cn(
                                "flex items-center gap-1 text-xs transition-colors",
                                hasLiked ? "text-blue-500" : "text-slate-400 hover:text-blue-500"
                            )}
                        >
                            <ThumbsUp className={cn("w-3.5 h-3.5", hasLiked && "fill-current")} />
                            いいね ({optimisticLikes})
                        </button>
                        <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="text-slate-400 hover:text-blue-500 flex items-center gap-1 text-xs transition-colors"
                        >
                            <Reply className="w-3.5 h-3.5" />
                            返信
                        </button>
                        {replies.length > 0 && (
                            <button
                                onClick={onToggleReplies}
                                className="text-blue-500 flex items-center gap-1 text-xs font-bold"
                            >
                                {showReplies ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                {replies.length}件の返信
                            </button>
                        )}
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-200">
                            <CommentForm
                                pollId={pollId}
                                parentId={comment.id}
                                isSubmitting={isSubmitting}
                                onSubmit={onSubmit}
                                onCancel={() => setReplyingTo(null)}
                                placeholder={`@${comment.author || '名無し'} への返信...`}
                            />
                        </div>
                    )}

                    {/* Replies */}
                    {showReplies && replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-slate-100 space-y-4">
                            {replies.map(reply => (
                                <ReplyItem key={reply.id} reply={reply} pollId={pollId} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ReplyItem({ reply, pollId }: { reply: Comment; pollId: string }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(reply.likes);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = () => {
        if (hasLiked) return;
        setHasLiked(true);
        startTransition(async () => {
            setOptimisticLikes(prev => prev + 1);
            await likeCommentAction(reply.id, pollId);
        });
    };

    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-400 flex-shrink-0">
                <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-700 text-sm">{reply.author || '名無し'}</span>
                    <span className="text-xs text-slate-400">{new Date(reply.created_at).toLocaleString()}</span>
                </div>
                <div className="bg-blue-50 rounded-r-xl rounded-bl-xl p-3 text-slate-700 leading-relaxed text-sm">
                    {reply.text}
                </div>
                <div className="flex items-center gap-4 mt-2 ml-1">
                    <button
                        onClick={handleLike}
                        disabled={hasLiked || isPending}
                        className={cn(
                            "flex items-center gap-1 text-xs transition-colors",
                            hasLiked ? "text-blue-500" : "text-slate-400 hover:text-blue-500"
                        )}
                    >
                        <ThumbsUp className={cn("w-3 h-3", hasLiked && "fill-current")} />
                        ({optimisticLikes})
                    </button>
                </div>
            </div>
        </div>
    );
}
