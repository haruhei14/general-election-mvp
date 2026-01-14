import { ImageResponse } from 'next/og';

// Edge Runtimeを使用（Vercel推奨）
export const runtime = 'edge';

/**
 * 動的OGP画像生成API
 * GET /api/og?title=お題タイトル
 * 
 * 日本語フォント（Noto Sans JP）を使用し、
 * SNSシェア時にクリック率を最大化するデザインを生成
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // タイトルをURLパラメータから取得（デフォルト値あり）
    const title = searchParams.get('title') ?? 'なんでも総選挙';

    // Noto Sans JP フォントを読み込み
    // Google Fonts CSSからotfファイルURLを動的に取得
    const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap';
    const cssResponse = await fetch(fontCssUrl, {
        headers: {
            // User-Agentを指定してotf/ttfファイルURLを取得（woff2ではなく）
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        },
    });
    const css = await cssResponse.text();

    // CSSからフォントURLを抽出
    const fontUrlMatch = css.match(/src: url\(([^)]+)\)/);
    if (!fontUrlMatch) {
        // フォントが見つからない場合はシンプルなフォールバック
        return new Response('Font not found', { status: 500 });
    }

    const fontUrl = fontUrlMatch[1];
    const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

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
                    // グラデーション背景
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                    fontFamily: 'Noto Sans JP',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* 装飾的な背景パターン */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        opacity: 0.03,
                    }}
                >
                    {/* チェックボックスパターン */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: `${(i * 120) % 500}px`,
                                left: `${(i * 200) % 1100}px`,
                                fontSize: 80,
                                transform: `rotate(${i * 15}deg)`,
                            }}
                        >
                            ☑
                        </div>
                    ))}
                </div>

                {/* 上部の装飾ライン */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 8,
                        background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                    }}
                />

                {/* メインコンテンツ */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 60px',
                        zIndex: 1,
                    }}
                >
                    {/* チェックアイコン */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            backgroundColor: '#3b82f6',
                            borderRadius: 20,
                            marginBottom: 30,
                            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                        }}
                    >
                        {/* SVGでチェックマークを描画 */}
                        <svg
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>

                    {/* メインタイトル */}
                    <div
                        style={{
                            fontSize: title.length > 20 ? 52 : title.length > 15 ? 64 : 72,
                            fontWeight: 700,
                            color: '#1e293b',
                            textAlign: 'center',
                            lineHeight: 1.3,
                            maxWidth: 1000,
                            marginBottom: 20,
                            textShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        }}
                    >
                        {title}
                    </div>

                    {/* サブテキスト */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            marginTop: 10,
                        }}
                    >
                        <span style={{ fontSize: 28, color: '#64748b' }}>
                            あなたはどっち派？投票してみよう！
                        </span>
                    </div>
                </div>

                {/* フッターエリア */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '24px 40px',
                        backgroundColor: '#1E90FF',
                    }}
                >
                    {/* ロゴ・サイト名 */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                backgroundColor: 'white',
                                borderRadius: 12,
                            }}
                        >
                            <span style={{ fontSize: 28 }}>🗳️</span>
                        </div>
                        <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>
                            なんでも総選挙
                        </span>
                    </div>

                    {/* URL */}
                    <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>
                        nandemo-vote.com
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Noto Sans JP',
                    data: fontData,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}
