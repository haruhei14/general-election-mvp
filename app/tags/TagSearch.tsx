'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Hash } from 'lucide-react';

type TagWithCount = {
    tag: string;
    count: number;
};

export default function TagSearch({ tags }: { tags: TagWithCount[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    // フィルタリング
    const filteredTags = tags.filter(t =>
        t.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 50音のグループ分け
    const groupedTags = filteredTags.reduce((acc, t) => {
        const firstChar = t.tag.charAt(0);
        if (!acc[firstChar]) {
            acc[firstChar] = [];
        }
        acc[firstChar].push(t);
        return acc;
    }, {} as Record<string, TagWithCount[]>);

    return (
        <>
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="タグを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-medium focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                />
            </div>

            {/* Tags Grid */}
            {filteredTags.length > 0 ? (
                <div className="space-y-8">
                    {Object.entries(groupedTags).map(([char, charTags]) => (
                        <div key={char}>
                            <h2 className="text-lg font-black text-slate-300 mb-3">{char}</h2>
                            <div className="flex flex-wrap gap-2">
                                {charTags.map(({ tag, count }) => (
                                    <Link
                                        key={tag}
                                        href={`/polls?tag=${encodeURIComponent(tag)}`}
                                        className="group flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-violet-300 hover:bg-violet-50 transition-all"
                                    >
                                        <Hash className="w-4 h-4 text-violet-500" />
                                        <span className="font-bold text-slate-700 group-hover:text-violet-700">{tag}</span>
                                        <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <Hash className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">
                        {searchQuery ? '該当するタグが見つかりません' : 'まだタグがありません'}
                    </p>
                </div>
            )}
        </>
    );
}
