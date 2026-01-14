import { supabase } from './supabase';

export type PollOption = {
    id: string;
    label: string;
    votes: number;
};

// 解説データの型定義
export type PollExplanation = {
    background?: string;
    psychology?: string;
    modern?: string;
    trivia?: string;
};

export type Poll = {
    id: string;
    title: string;
    description?: string;
    options: PollOption[];
    genre: string;
    image_url?: string;
    created_at: string;
    explanation?: PollExplanation | null;
    poll_type?: 'seed' | 'user' | 'daily_trend';
    tags?: string[];
};

export type Comment = {
    id: string;
    poll_id: string;
    text: string;
    author: string;
    created_at: string;
    likes: number;
    parent_id?: string | null;
};

export const GENRES = ["食べ物", "日常・価値観", "仕事・社会人", "趣味・娯楽", "日常・生活", "価値観", "エンタメ", "仕事・学び", "テクノロジー", "人間関係", "究極の選択", "学校"] as const;

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

export async function getRandomPolls(limit: number = 3): Promise<Poll[]> {
    // For MVP, fetch recent and shuffle in memory
    const { data, error } = await supabase.from('polls').select('*').limit(30);
    if (error || !data) return [];
    return (data as Poll[]).sort(() => Math.random() - 0.5).slice(0, limit);
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

export async function addComment(pollId: string, text: string, author: string = "名無し", parentId?: string): Promise<void> {
    await supabase
        .from('comments')
        .insert([{
            poll_id: pollId,
            text,
            author: author || "名無し",
            likes: 0,
            parent_id: parentId || null
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

// 最新のトレンドお題を取得（今日の一問用）
export async function getLatestDailyPoll(): Promise<Poll | undefined> {
    const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('poll_type', 'daily_trend')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error || !data) return undefined;
    return data as Poll;
}

import { getReading } from './tag-utils';

// 全タグを取得（重複なし、50音順）
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
    const polls = await getPolls();
    const tagCounts: Record<string, number> = {};

    polls.forEach(poll => {
        if (poll.tags && Array.isArray(poll.tags)) {
            poll.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    // 読み仮名で50音順にソート
    return Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => {
            const readingA = getReading(a.tag);
            const readingB = getReading(b.tag);
            return readingA.localeCompare(readingB, 'ja');
        });
}

// タグでお題を検索
export async function getPollsByTag(tag: string): Promise<Poll[]> {
    const { data, error } = await supabase
        .from('polls')
        .select('*')
        .contains('tags', [tag])
        .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Poll[];
}
