import { getPoll, getComments } from '@/lib/data';
import { PollCard } from '@/components/PollCard';
import { CommentSection } from '@/components/CommentSection';
import { VoteVisualization } from '@/components/VoteChart';
import { PollExplanationSection } from '@/components/PollExplanationSection';
import { ShareButtons } from '@/components/ShareButtons';
import { AdSense } from '@/components/AdSense';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Share2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const poll = await getPoll(id);

    if (!poll) return { title: '404 - Not Found' };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // 新しいOGP APIを使用（日本語フォント対応・モダンデザイン）
    const ogUrl = `${baseUrl}/api/og?title=${encodeURIComponent(poll.title)}`;

    return {
        title: `${poll.title} | なんでも総選挙`,
        description: poll.description || 'あなたも投票に参加しよう！',
        openGraph: {
            title: poll.title,
            description: poll.description || 'あなたも投票に参加しよう！',
            images: [{ url: ogUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: poll.title,
            images: [ogUrl],
        },
    };
}

export default async function PollPage(props: Props) {
    const { id } = await props.params;
    const poll = await getPoll(id);

    if (!poll) notFound();

    const comments = await getComments(id);

    return (
        <div className="container-responsive py-8 max-w-6xl">
            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>戻る</span>
                </Link>
                <div className="text-sm">
                    <span className="text-slate-400">ホーム / </span>
                    <span className="font-bold text-slate-800">{poll.genre}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="animate-in fade-in zoom-in-95 duration-700">
                        <PollCard poll={poll} />
                    </div>

                    {/* 豆知識・解説セクション */}
                    <PollExplanationSection poll={poll} />

                    <AdSense type="mid" />

                    <CommentSection pollId={poll.id} comments={comments} />

                    <AdSense type="responsive" />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sticky top-24">
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Share2 className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-800">結果をシェアする</h4>
                        </div>

                        <ShareButtons pollId={poll.id} pollTitle={poll.title} />

                        <div className="mt-10">
                            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                投票データ
                            </h4>
                            <VoteVisualization pollId={poll.id} initialOptions={poll.options} />

                            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    ※投票は匿名で行われ、ブラウザのCookie/LocalStorageを使用して多重投票を制限しています。より公正な結果を提供するため、不正なアクセスは集計から除外される場合があります。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
