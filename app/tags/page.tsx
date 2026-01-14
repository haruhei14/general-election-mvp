import { getAllTags } from '@/lib/data';
import Link from 'next/link';
import { Hash, Search } from 'lucide-react';
import { Metadata } from 'next';
import TagSearch from './TagSearch';

export const metadata: Metadata = {
    title: 'タグ一覧 | なんでも総選挙',
    description: 'お題をタグから探そう。50音順で表示されます。',
    openGraph: {
        title: 'タグ一覧 | なんでも総選挙',
        description: 'タグからお題を探そう',
        images: [{ url: 'https://www.nandemo-vote.com/api/og?title=タグ一覧', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.nandemo-vote.com/api/og?title=タグ一覧'],
    },
};

export default async function TagsPage() {
    const tags = await getAllTags();

    return (
        <div className="container-responsive py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-violet-100 text-violet-600 rounded-xl">
                        <Hash className="w-6 h-6" />
                    </span>
                    タグ一覧
                </h1>
                <p className="text-slate-500 mt-2">興味のあるタグからお題を探してみましょう</p>
            </div>

            {/* Search and Tags */}
            <TagSearch tags={tags} />
        </div>
    );
}
