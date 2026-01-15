import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * お題リクエスト一覧を取得するAPI（管理者用）
 */
export async function GET() {
    try {
        // リクエスト一覧を取得（最新100件）
        const { data, error } = await supabase
            .from('theme_requests')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error('Theme request fetch error:', error);
            return NextResponse.json(
                { error: 'データの取得に失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            requests: data,
            total: data.length
        });

    } catch (error) {
        console.error('Theme request list API error:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
