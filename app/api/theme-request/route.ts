import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * お題リクエストを保存するAPI
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { requestText, source = 'marugoto' } = body;

        // バリデーション
        if (!requestText || typeof requestText !== 'string') {
            return NextResponse.json(
                { error: 'リクエスト内容が必要です' },
                { status: 400 }
            );
        }

        const trimmedText = requestText.trim();

        if (trimmedText.length === 0) {
            return NextResponse.json(
                { error: 'リクエスト内容を入力してください' },
                { status: 400 }
            );
        }

        if (trimmedText.length > 500) {
            return NextResponse.json(
                { error: 'リクエストは500文字以内で入力してください' },
                { status: 400 }
            );
        }

        // Supabaseクライアント
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // データ挿入
        const { data, error } = await supabase
            .from('theme_requests')
            .insert({
                request_text: trimmedText,
                source: source,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Theme request insert error:', error);
            return NextResponse.json(
                { error: 'リクエストの保存に失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'リクエストを受け付けました！',
            id: data.id
        });

    } catch (error) {
        console.error('Theme request API error:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
