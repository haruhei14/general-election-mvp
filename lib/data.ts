import { supabase } from './supabase';

export type PollOption = {
    id: string;
    label: string;
    votes: number;
};

export type Poll = {
    id: string;
    title: string;
    description?: string;
    options: PollOption[];
    genre: string;
    image_url?: string;
    created_at: string;
};

export type Comment = {
    id: string;
    poll_id: string;
    text: string;
    author: string;
    created_at: string;
    likes: number;
};

export const GENRES = ["自然", "飲み物", "季節", "映画", "音楽"] as const;

export async function getPolls(genre?: string): Promise<Poll[]> {
    let query = supabase.from('polls').select('*').order('created_at', { ascending: false });
    if (genre) {
        query = query.eq('genre', genre);
    }
    const { data, error } = await query;
    if (error) {
        console.error('getPolls error:', error);
        return [];
    }
    return data as Poll[];
}

export async function getPopularPolls(limit: number = 3): Promise<Poll[]> {
    // Simplistic ranking: fetch all and sort in memory (Supabase JSONB sorting is complex)
    const polls = await getPolls();
    return polls
        .sort((a, b) => {
            const aVotes = a.options.reduce((sum, o) => sum + o.votes, 0);
            const bVotes = b.options.reduce((sum, o) => sum + o.votes, 0);
            return bVotes - aVotes;
        })
        .slice(0, limit);
}

export async function getRandomPoll(): Promise<Poll | undefined> {
    const { data, error } = await supabase.from('polls').select('*').limit(1);
    if (error || !data) return undefined;
    // Supabase doesn't have simple 'random', just pick first for MVP or fetch all ids
    return data[0] as Poll;
}

export async function getPoll(id: string): Promise<Poll | undefined> {
    const { data, error } = await supabase.from('polls').select('*').eq('id', id).single();
    if (error) return undefined;
    return data as Poll;
}

export async function votePoll(pollId: string, optionId: string): Promise<void> {
    console.log(`Attempting to vote on poll ${pollId} for option ${optionId}`);
    const poll = await getPoll(pollId);
    if (!poll) {
        console.warn(`Poll ${pollId} not found for voting.`);
        return;
    }

    const newOptions = poll.options.map(opt => {
        if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
    });

    const { error } = await supabase
        .from('polls')
        .update({ options: newOptions })
        .eq('id', pollId);

    if (error) {
        console.error(`Error voting on poll ${pollId}:`, error);
    } else {
        console.log(`Successfully voted on poll ${pollId} for option ${optionId}.`);
    }
}

export async function getComments(pollId: string): Promise<Comment[]> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('poll_id', pollId)
        .order('created_at', { ascending: false });

    if (error) return [];
    return data as Comment[];
}

export async function addComment(pollId: string, text: string, author: string = "名無し"): Promise<void> {
    await supabase
        .from('comments')
        .insert([{
            poll_id: pollId,
            text,
            author: author || "名無し",
            likes: 0
        }]);
}

export async function createPoll(poll: Omit<Poll, 'created_at'>): Promise<void> {
    const { error } = await supabase.from('polls').insert([poll]);
    if (error) {
        console.error('createPoll error:', error);
        throw new Error('お題の作成に失敗しました');
    }
}

export async function likeComment(commentId: string): Promise<void> {
    // Note: needs a RPC or raw query for atomic increment in Supabase for better performance, 
    // but this read-write works for MVP
    const { data: comment } = await supabase.from('comments').select('likes').eq('id', commentId).single();
    if (comment) {
        await supabase.from('comments').update({ likes: (comment.likes || 0) + 1 }).eq('id', commentId);
    }
}
