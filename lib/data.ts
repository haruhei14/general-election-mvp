import fs from 'fs/promises';
import path from 'path';

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
    createdAt: string;
};

export type Comment = {
    id: string;
    pollId: string;
    text: string;
    author: string;
    createdAt: string;
    likes: number;
};

type DataSchema = {
    polls: Poll[];
    comments: Comment[];
};

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Initial data
const INITIAL_DATA: DataSchema = {
    polls: [
        {
            id: "sea-vs-mountain",
            title: "好きなのは？海 or 山",
            description: "あなたの休日の理想の過ごし方に近いのはどっち？",
            genre: "自然",
            createdAt: new Date().toISOString(),
            options: [
                { id: "opt-sea", label: "海", votes: 0 },
                { id: "opt-mountain", label: "山", votes: 0 },
            ]
        }
    ],
    comments: []
};

async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        const dir = path.dirname(DB_PATH);
        try {
            await fs.access(dir);
        } catch {
            await fs.mkdir(dir, { recursive: true });
        }
        await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    }
}

async function readDb(): Promise<DataSchema> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

async function writeDb(data: DataSchema) {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getPolls(genre?: string): Promise<Poll[]> {
    const db = await readDb();
    let polls = db.polls;
    if (genre) {
        polls = polls.filter(p => p.genre === genre);
    }
    return polls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPopularPolls(limit: number = 3): Promise<Poll[]> {
    const db = await readDb();
    return [...db.polls]
        .sort((a, b) => {
            const aVotes = a.options.reduce((sum, o) => sum + o.votes, 0);
            const bVotes = b.options.reduce((sum, o) => sum + o.votes, 0);
            return bVotes - aVotes;
        })
        .slice(0, limit);
}

export async function getRandomPoll(): Promise<Poll | undefined> {
    const db = await readDb();
    if (db.polls.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * db.polls.length);
    return db.polls[randomIndex];
}

export async function getPoll(id: string): Promise<Poll | undefined> {
    const db = await readDb();
    return db.polls.find(p => p.id === id);
}

export async function votePoll(pollId: string, optionId: string): Promise<Poll | undefined> {
    const db = await readDb();
    const pollIndex = db.polls.findIndex(p => p.id === pollId);
    if (pollIndex === -1) return undefined;

    const poll = db.polls[pollIndex];
    const optionIndex = poll.options.findIndex(o => o.id === optionId);
    if (optionIndex === -1) return undefined;

    // Update votes
    poll.options[optionIndex].votes += 1;
    db.polls[pollIndex] = poll;

    await writeDb(db);
    return poll;
}

export async function getComments(pollId: string): Promise<Comment[]> {
    const db = await readDb();
    return db.comments.filter(c => c.pollId === pollId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addComment(pollId: string, text: string, author: string = "名無し"): Promise<Comment> {
    const db = await readDb();
    const newComment: Comment = {
        id: Date.now().toString(),
        pollId,
        text,
        author: author || "名無し",
        createdAt: new Date().toISOString(),
        likes: 0
    };

    db.comments.push(newComment);
    await writeDb(db);
    return newComment;
}

export async function likeComment(commentId: string): Promise<void> {
    const db = await readDb();
    const comment = db.comments.find(c => c.id === commentId);
    if (comment) {
        comment.likes += 1;
        await writeDb(db);
    }
}

export const GENRES = ["自然", "飲み物", "季節", "映画", "音楽"] as const;
