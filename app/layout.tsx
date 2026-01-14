import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'なんでも総選挙 | みんなの意見が見える投票サイト',
  description: '日常の些細な選択から究極の決断まで。みんなの投票で白黒つけよう！',
  openGraph: {
    title: 'なんでも総選挙',
    description: 'みんなの意見が見える投票サイト',
    siteName: 'なんでも総選挙',
    locale: 'ja_JP',
    type: 'website',
    images: [{
      url: 'https://www.nandemo-vote.com/api/og?title=なんでも総選挙',
      width: 1200,
      height: 630
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'なんでも総選挙',
    images: ['https://www.nandemo-vote.com/api/og?title=なんでも総選挙'],
  },
  verification: {
    google: 'dmb5tVfiy0ceJnxjtQaGnC8pXcZWuXRhKnzjKtdEFwo',
  },
};

import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="dmb5tVfiy0ceJnxjtQaGnC8pXcZWuXRhKnzjKtdEFwo" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1271313998587085" crossOrigin="anonymous"></script>
      </head>
      <GoogleAnalytics gaId="G-BK9K2TSJP4" />
      <body className={cn(inter.className, "min-h-screen flex flex-col bg-slate-50")}>
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
