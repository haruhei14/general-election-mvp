import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/admin/:path*', '/api/seed-polls/:path*'],
};

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        // 環境変数に設定がない場合はデフォルト値を使用
        const validUser = process.env.ADMIN_USER || 'admin';
        const validPass = process.env.ADMIN_PASSWORD || 'admin123';

        if (user === validUser && pwd === validPass) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Auth Required.', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
