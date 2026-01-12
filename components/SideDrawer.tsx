'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, List, Tags, PenLine, BarChart3, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
    { href: '/polls', label: 'お題一覧', icon: List, category: 'browse' },
    { href: '/genres', label: 'ジャンル一覧', icon: Tags, category: 'browse' },
    { href: '/poll/create', label: 'お題を作成する', icon: PenLine, category: 'action' },
    { href: '/my-votes', label: 'マイレポート', icon: BarChart3, category: 'action' },
    { href: '/achievements', label: 'ランク・実績', icon: Trophy, category: 'action' },
];

export function SideDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ease-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <span className="font-black text-slate-800">メニュー</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        aria-label="メニューを閉じる"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="py-4">
                    {/* Browse Section */}
                    <div className="px-4 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">閲覧</span>
                    </div>
                    {MENU_ITEMS.filter(item => item.category === 'browse').map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-4 px-6 py-4 transition-colors",
                                pathname === item.href
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold">{item.label}</span>
                        </Link>
                    ))}

                    {/* Separator */}
                    <div className="my-4 border-t border-slate-100" />

                    {/* Action Section */}
                    <div className="px-4 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">参加・管理</span>
                    </div>
                    {MENU_ITEMS.filter(item => item.category === 'action').map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-4 px-6 py-4 transition-colors",
                                pathname === item.href
                                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                                    : "text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] text-slate-400 text-center">
                        © なんでも総選挙
                    </p>
                </div>
            </aside>
        </>
    );
}
