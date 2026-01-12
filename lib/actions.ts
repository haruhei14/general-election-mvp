'use server'

import { revalidatePath } from 'next/cache';
import { votePoll, addComment, createPoll } from './data';

// --- Profanity Filter ---
const PROHIBITED_WORDS = [
    '死ね', '殺す', 'キチガイ', 'カス', 'ゴミ', 'バカ', 'アホ', // 攻撃的
    'セ○クス', 'クリトリス', 'フェラ', 'マンコ', 'チンコ', '淫乱', // 下ネタ (一部伏せ字含む代表例)
    '部落', '朝鮮人', 'シナ人', 'ガイジ', // 差別的
    // 必要に応じて追加
];

function containsProhibitedContent(text: string): boolean {
    const normalized = text.toLowerCase().replace(/\s+/g, '');
    return PROHIBITED_WORDS.some(word => normalized.includes(word));
}

export async function submitVote(pollId: string, optionId: string) {
    await votePoll(pollId, optionId);
    revalidatePath(`/poll/${pollId}`);
    revalidatePath(`/`);
}

export async function submitPoll(formData: FormData) {
    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) || '';
    const genre = formData.get('genre') as string;
    const imageUrl = formData.get('imageUrl') as string;

    // Extract all options dynamicall
    const options: { id: string, label: string, votes: number }[] = [];
    for (let i = 1; i <= 10; i++) {
        const label = formData.get(`option${i}`) as string;
        if (label && label.trim()) {
            options.push({
                id: `opt-${i}`,
                label: label.trim(),
                votes: 0
            });
        }
    }

    // Validation
    if (!title || !genre || options.length < 2) {
        throw new Error('必須事項（タイトル、ジャンル、2つ以上の選択肢）を正しく入力してください');
    }

    // Safety Check
    const allContent = [title, description, ...options.map(o => o.label)].join(' ');
    if (containsProhibitedContent(allContent)) {
        throw new Error('不適切な言葉が含まれているため、作成できません。公序良俗に反する投稿はお控えください。');
    }

    // Simple slugification for ID
    const id = title.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        || `poll-${Date.now()}`;

    await createPoll({
        id,
        title,
        description,
        genre,
        image_url: imageUrl || '',
        options
    });

    revalidatePath('/');
    return id;
}

export async function submitComment(formData: FormData) {
    const pollId = formData.get('pollId') as string;
    const text = formData.get('text') as string;
    const author = formData.get('author') as string;

    if (!pollId || !text) return;

    // Safety Check for comments too
    if (containsProhibitedContent(text + (author || ''))) {
        throw new Error('不適切な投稿は制限されています。');
    }

    await addComment(pollId, text, author);
    revalidatePath(`/poll/${pollId}`);
}
