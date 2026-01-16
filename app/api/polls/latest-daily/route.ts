import { getLatestDailyPoll } from '@/lib/data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const poll = await getLatestDailyPoll();
        return NextResponse.json({ poll });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch latest daily poll' }, { status: 500 });
    }
}
