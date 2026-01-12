import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    // Fetch random poll ID
    // Note: Suapbase doesn't have a native random sort in a simple query, 
    // so we fetch a pool and pick one.
    const { data, error } = await supabase
        .from('polls')
        .select('id')
        .limit(100);

    if (error || !data || data.length === 0) {
        return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPollId = data[randomIndex].id;

    return NextResponse.redirect(new URL(`/poll/${randomPollId}`, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
