import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // パラメータ取得
        const title = searchParams.get('title')?.slice(0, 100) || 'なんでも総選挙';
        const optionsStr = searchParams.get('options');

        // Noto Sans JP フォントの読み込み
        const fontData = await fetch(
            new URL('https://assets.nandemo-vote.com/fonts/NotoSansJP-Bold.otf', req.url)
        ).then((res) => {
            if (res.ok) return res.arrayBuffer();
            // フォールバック: Google Fonts (ただしCSSパースが必要なため、今回は簡易的に標準フォントを使用するか、外部URLを指定)
            // ここではVercelやGitHubなどのCDNからフォントを取得するのが一般的
            return fetch('https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf').then(r => r.arrayBuffer());
        }).catch(() => null);

        // 投票データのパース (Label:Votes,Label:Votes)
        const options = optionsStr
            ? optionsStr.split(',').map((opt) => {
                const [label, votes] = opt.split(':');
                return { label, votes: parseInt(votes || '0', 10) };
            })
            : [];

        const totalVotes = options.reduce((acc, cur) => acc + cur.votes, 0);

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
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                        color: 'white',
                        padding: '40px',
                        fontFamily: '"Noto Sans JP", sans-serif',
                    }}
                >
                    {/* Logo / Site Name */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 40,
                            fontSize: 24,
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 0.8,
                        }}
                    >
                        <span style={{ marginRight: 8 }}>🗳️</span>
                        なんでも総選挙
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 900,
                            textAlign: 'center',
                            lineHeight: 1.2,
                            marginBottom: options.length > 0 ? 40 : 0,
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            maxWidth: '90%',
                            wordWrap: 'break-word',
                        }}
                    >
                        {title}
                    </div>

                    {/* Chart Section */}
                    {options.length > 0 && totalVotes > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                width: '100%',
                                maxWidth: 900,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                height: 200,
                            }}
                        >
                            {options.map((opt, i) => {
                                const percentage = Math.round((opt.votes / totalVotes) * 100);
                                const height = Math.max(20, (percentage / 100) * 200);
                                const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'];
                                const color = colors[i % colors.length];

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        {/* Bar */}
                                        <div
                                            style={{
                                                width: '100%',
                                                height: `${height}px`,
                                                background: color,
                                                borderRadius: '12px 12px 0 0',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {percentage}%
                                        </div>
                                        {/* Label */}
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {opt.label.length > 8 ? opt.label.slice(0, 7) + '...' : opt.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ),
            {
                width: 1200,
                height: 630,
                // fonts: fontData ? [
                //   {
                //     name: 'Noto Sans JP',
                //     data: fontData,
                //     style: 'normal',
                //     weight: 700,
                //   },
                // ] : undefined,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
