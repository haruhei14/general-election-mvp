'use server'

import { revalidatePath } from 'next/cache';
import { votePoll, addComment } from './data';

export async function submitVote(pollId: string, optionId: string) {
    await votePoll(pollId, optionId);
    revalidatePath(`/poll/${pollId}`);
    revalidatePath(`/`);
}

export async function submitComment(formData: FormData) {
    const pollId = formData.get('pollId') as string;
    const text = formData.get('text') as string;
    const author = formData.get('author') as string;

    if (!pollId || !text) return;

    await addComment(pollId, text, author);
    revalidatePath(`/poll/${pollId}`);
}
