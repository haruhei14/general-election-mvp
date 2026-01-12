import { ImageResponse } from 'next/og';
import { getPoll } from '@/lib/data';

// Using Node.js runtime because we need to read local filesystem (db.json)
export const runtime = 'nodejs';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const { id } = params;
    const poll = await getPoll(id);

    if (!poll) {
        return new Response('Poll not found', { status: 404 });
    }

    const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1E90FF',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <div style={{ color: 'white', fontSize: 24, marginBottom: 10, opacity: 0.8 }}>
                        なんでも総選挙 - {poll.genre}
                    </div>
                    <div style={{ color: 'white', fontSize: 60, fontWeight: 900, lineHeight: 1.2 }}>
                        {poll.title}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: '900px',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    {poll.options.map((opt) => {
                        const percent = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                        // Limit max width to keep text visible or handle 0
                        const barWidth = percent === 0 ? '1%' : `${percent}%`;

                        return (
                            <div
                                key={opt.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '60px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '30px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: barWidth,
                                        backgroundColor: '#4ade80', // green-400
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0 30px',
                                        color: 'white',
                                        fontSize: 28,
                                        fontWeight: 700,
                                    }}
                                >
                                    <span>{opt.label}</span>
                                    <span>{Math.round(percent)}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ position: 'absolute', bottom: 40, right: 40, color: 'white', opacity: 0.6, fontSize: 24 }}>
                    総投票数: {totalVotes} 票
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
