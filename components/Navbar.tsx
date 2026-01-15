'use client';

import Link from 'next/link';
import { Menu, Vote } from 'lucide-react';
import { useState } from 'react';
import { SideDrawer } from './SideDrawer';

export function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 flex h-14 items-center justify-between">
                    {/* Left: Hamburger */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="メニューを開く"
                    >
                        <Menu className="w-6 h-6 text-slate-700" />
                    </button>

                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        <Vote className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            なんでも総選挙
                        </span>
                    </Link>

                    {/* Right: Official X Link */}
                    <a
                        href="https://twitter.com/nandemo_vote"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-bold"
                        aria-label="公式Xアカウント"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="hidden sm:inline">Follow</span>
                    </a>
                </div>
            </header>

            <SideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
