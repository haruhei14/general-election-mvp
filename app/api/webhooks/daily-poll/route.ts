import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// APIセキュリティ用のシークレットキー（Vercel環境変数で設定）
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
    try {
        // 認証チェック
        const authHeader = request.headers.get('authorization');
        if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json(
                { error: '認証に失敗しました' },
                { status: 401 }
            );
        }

        // リクエストボディを取得
        const body = await request.json();
        const { title, options, explanation, genre = 'トレンド' } = body as {
            title: string;
            options: string[];
            explanation: {
                background?: string;
                psychology?: string;
                modern?: string;
                trivia?: string;
            };
            genre?: string;
        };

        // バリデーション
        if (!title || !options || options.length < 2) {
            return NextResponse.json(
                { error: 'title と options（2つ以上）は必須です' },
                { status: 400 }
            );
        }

        // お題データを構築
        const pollId = uuidv4();
        const pollOptions = options.map((label: string, index: number) => ({
            id: `${pollId}-opt-${index}`,
            label,
            votes: 0
        }));

        const newPoll = {
            id: pollId,
            title,
            description: `トレンド連動お題: ${title}`,
            options: pollOptions,
            genre,
            poll_type: 'daily_trend',
            explanation: explanation || null,
        };

        // データベースに挿入
        const { error } = await supabase.from('polls').insert([newPoll]);

        if (error) {
            console.error('Daily Poll Insert Error:', error);
            return NextResponse.json(
                { error: 'データベースへの挿入に失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '今日の一問が正常に登録されました',
            poll_id: pollId
        });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
