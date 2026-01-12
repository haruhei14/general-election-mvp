import { supabase } from '@/lib/supabase';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // Fetch random poll ID pool
    const { data, error } = await supabase
        .from('polls')
        .select('id')
        .limit(200);

    const baseUrl = request.nextUrl.origin;

    if (error || !data || data.length === 0) {
        return NextResponse.redirect(new URL('/', baseUrl));
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPollId = data[randomIndex].id;

    // Use absolute URL for the redirect
    const redirectUrl = new URL(`/poll/${randomPollId}`, baseUrl);
    return NextResponse.redirect(redirectUrl);
}
