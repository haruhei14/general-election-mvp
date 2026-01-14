import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { MessageCircle, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '最近のコメント | なんでも総選挙',
    description: 'みんなの意見やコメントをチェック！',
    openGraph: {
        title: '最近のコメント | なんでも総選挙',
        description: 'みんなの意見をチェック',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=最近のコメント', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=最近のコメント'],
    },
};

type Comment = {
    id: string;
    poll_id: string;
    content: string;
    author_name: string;
    created_at: string;
    poll_title?: string;
};

async function getRecentComments(): Promise<Comment[]> {
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

    if (error || !comments) return [];

    // Get poll titles for each comment
    const pollIds = [...new Set(comments.map(c => c.poll_id))];
    const { data: polls } = await supabase
        .from('polls')
        .select('id, title')
        .in('id', pollIds);

    const pollMap = new Map(polls?.map(p => [p.id, p.title]) || []);

    return comments.map(c => ({
        ...c,
        poll_title: pollMap.get(c.poll_id) || 'お題'
    }));
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 7) return `${diffDays}日前`;
    return date.toLocaleDateString('ja-JP');
}

export default async function CommentsPage() {
    const comments = await getRecentComments();

    return (
        <div className="container-responsive py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                        <MessageCircle className="w-6 h-6" />
                    </span>
                    最近のコメント
                </h1>
                <p className="text-slate-500 mt-2">みんなの意見をチェックしよう</p>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <Link
                            key={comment.id}
                            href={`/poll/${comment.poll_id}`}
                            className="block bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group"
                        >
                            {/* Poll Title */}
                            <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2 group-hover:text-blue-600">
                                {comment.poll_title}
                            </div>

                            {/* Comment Content */}
                            <p className="text-slate-700 font-medium line-clamp-2">
                                {comment.content}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-3 mt-3 text-slate-400 text-xs">
                                <span className="font-bold">{comment.author_name || '匿名'}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTimeAgo(comment.created_at)}
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">まだコメントがありません</p>
                        <p className="text-slate-400 text-sm mt-1">お題に投票してコメントを残してみよう！</p>
                    </div>
                )}
            </div>
        </div>
    );
}
