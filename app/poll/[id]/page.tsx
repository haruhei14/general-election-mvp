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
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

// ===== 超シンプルなOGP画像マッピング =====
// お題IDに対応する画像ファイル名を直接指定
// 画像は public/ フォルダに ogp-{id}.png の形式で配置
const OGP_IMAGES: Record<string, string> = {
    'disconnect-right-2026': 'https://www.nandemo-vote.com/ogp-disconnect-right.png',
    // 今後追加するお題はここに1行追加するだけ
    // 例: 'new-poll-id': 'https://www.nandemo-vote.com/ogp-new-poll-id.png',
};

// デフォルト画像（マッピングにないお題用）
const DEFAULT_OGP = 'https://www.nandemo-vote.com/ogp-marugoto.png';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const poll = await getPoll(id);

    // お題が見つからない場合でも、マッピングがあればOGPは返す
    const ogpImage = OGP_IMAGES[id] || DEFAULT_OGP;
    const title = poll?.title || 'なんでも総選挙';
    const description = poll?.description || 'みんなの意見を可視化する投票サイト';

    return {
        title: `${title} | なんでも総選挙`,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: ogpImage, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogpImage],
        },
    };
}

export default async function PollPage(props: Props) {
    const { id } = await props.params;
    const poll = await getPoll(id);

    if (!poll) notFound();

    const comments = await getComments(id);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nandemo-vote.com';

    // 構造化データ (JSON-LD)
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    'itemListElement': [
                        {
                            '@type': 'ListItem',
                            'position': 1,
                            'name': 'ホーム',
                            'item': baseUrl
                        },
                        {
                            '@type': 'ListItem',
                            'position': 2,
                            'name': poll.genre,
                            'item': `${baseUrl}/polls?genre=${encodeURIComponent(poll.genre)}`
                        },
                        {
                            '@type': 'ListItem',
                            'position': 3,
                            'name': poll.title
                        }
                    ]
                },
                {
                    '@type': 'Article',
                    'headline': poll.title,
                    'description': poll.description || `${poll.title}についての投票です。`,
                    'image': [`${baseUrl}/api/og?title=${encodeURIComponent(poll.title)}`],
                    'datePublished': poll.created_at,
                    'author': {
                        '@type': 'Organization',
                        'name': 'なんでも総選挙'
                    },
                    'interactionStatistic': {
                        '@type': 'InteractionCounter',
                        'interactionType': 'https://schema.org/VoteAction',
                        'userInteractionCount': poll.options.reduce((sum, o) => sum + o.votes, 0)
                    }
                }
            ]
        },
        {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            'mainEntity': {
                '@type': 'Question',
                'name': poll.title,
                'text': poll.description || `${poll.title}について、みんなの意見を投票で決めています。`,
                'answerCount': poll.options.length,
                'upvoteCount': poll.options.reduce((sum, o) => sum + o.votes, 0),
                'suggestedAnswer': poll.options.map(option => ({
                    '@type': 'Answer',
                    'text': option.label,
                    'upvoteCount': option.votes,
                    'url': `${baseUrl}/poll/${poll.id}`
                }))
            }
        }
    ];

    return (
        <div className="container-responsive py-8 max-w-6xl">
            {jsonLd.map((data, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
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

                        {/* Custom Share Text for Specific Polls */}
                        {(() => {
                            const shareText = poll.id === 'disconnect-right-2026'
                                ? '休日の仕事LINE、正直どう思う？ #つながらない権利 #デジタルデトックス #なんでも総選挙'
                                : undefined;

                            return (
                                <ShareButtons pollId={poll.id} pollTitle={poll.title} shareText={shareText} />
                            );
                        })()}

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
