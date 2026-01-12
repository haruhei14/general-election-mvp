import { getPoll } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pollId = searchParams.get('pollId');

    if (!pollId) {
        return NextResponse.json({ error: 'Missing pollId' }, { status: 400 });
    }

    const poll = await getPoll(pollId);
    if (!poll) {
        return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    return NextResponse.json({ options: poll.options });
}
