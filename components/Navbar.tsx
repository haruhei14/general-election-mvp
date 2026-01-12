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

                    {/* Right: Empty for balance */}
                    <div className="w-10" aria-hidden="true" />
                </div>
            </header>

            <SideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
