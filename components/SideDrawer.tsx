'use client';

import { createPortal } from 'react-dom';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, List, Tags, PenLine, BarChart3, Trophy, TrendingUp, Sparkles, MessageCircle, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
    { href: '/polls?sort=newest', label: '新着のお題', icon: Sparkles, category: 'browse' },
    { href: '/comments', label: '最近のコメント', icon: MessageCircle, category: 'browse' },
    { href: '/polls', label: 'お題一覧', icon: List, category: 'browse' },
    { href: '/genres', label: 'ジャンル一覧', icon: Tags, category: 'browse' },
    { href: '/tags', label: 'タグ一覧', icon: Hash, category: 'browse' },
    { href: '/ranking', label: '人気ランキング', icon: TrendingUp, category: 'browse' },
    { href: '/poll/create', label: 'お題を作成する', icon: PenLine, category: 'action' },
    { href: '/my-votes', label: 'マイレポート', icon: BarChart3, category: 'action' },
    { href: '/achievements', label: 'ランク・実績', icon: Trophy, category: 'action' },
];

export function SideDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // iOS body scroll lock fix (optional but safer)
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = '';
            };
        }
    }, [isOpen, onClose]);

    if (!mounted) return null;

    // Portalを使用してbody直下にレンダリングすることで、親要素のCSS干渉（transform等）を回避
    // これによりz-indexやposition: fixedが確実に機能する
    const drawerContent = (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/30 z-[9998] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 w-72 bg-white z-[9999] shadow-2xl transition-transform duration-300 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex-none flex items-center justify-between p-4 border-b border-slate-100">
                    <span className="font-black text-slate-800">メニュー</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        aria-label="メニューを閉じる"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Menu Items (Scrollable) */}
                <div
                    className="flex-1 overflow-y-auto overscroll-contain w-full"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <nav className="py-4 pb-32">
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

                        {/* Footer (Scrollable area specific) */}
                        <div className="mt-8 mx-4 pt-6 border-t border-slate-100">
                            <p className="text-[10px] text-slate-400 text-center">
                                © 2026 なんでも総選挙
                            </p>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );

    // SSRチェックとドキュメント存在確認
    if (!mounted || typeof document === 'undefined') return null;

    return createPortal(drawerContent, document.body);
}
