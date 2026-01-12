'use server'

import { revalidatePath } from 'next/cache';
import { votePoll, addComment, createPoll } from './data';

export async function submitVote(pollId: string, optionId: string) {
    await votePoll(pollId, optionId);
    revalidatePath(`/poll/${pollId}`);
    revalidatePath(`/`);
}

export async function submitPoll(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const genre = formData.get('genre') as string;
    const option1 = formData.get('option1') as string;
    const option2 = formData.get('option2') as string;

    if (!title || !genre || !option1 || !option2) {
        throw new Error('必須項目を入力してください');
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
        options: [
            { id: 'opt-1', label: option1, votes: 0 },
            { id: 'opt-2', label: option2, votes: 0 }
        ]
    });

    revalidatePath('/');
    return id;
}

export async function submitComment(formData: FormData) {
    const pollId = formData.get('pollId') as string;
    const text = formData.get('text') as string;
    const author = formData.get('author') as string;

    if (!pollId || !text) return;

    await addComment(pollId, text, author);
    revalidatePath(`/poll/${pollId}`);
}
