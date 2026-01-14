import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        url_len: (process.env.NEXT_PUBLIC_SUPABASE_URL || '').length,
        key_len: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').length,
        node_env: process.env.NODE_ENV
    });
}
