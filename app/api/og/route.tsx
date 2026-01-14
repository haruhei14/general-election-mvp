import { NextResponse } from 'next/server';

// ローカル環境（Windows）でのクラッシュ回避のため、
// 動的画像生成を一時的に無効化しています。
// 本番環境（Vercelなど）では元のコードに戻すことで動作します。

export const runtime = 'nodejs';

export async function GET() {
    return new NextResponse('Dynamic OGP Preview (Disabled locally due to Windows compatibility issues)', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
