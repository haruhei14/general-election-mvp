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
    const title = searchParams.get('title') ?? 'なんでも総選挙';

    // オプションデータ処理
    const optionsParam = searchParams.get('options');
    let options: { label: string; percentage: number; color: string }[] = [];

    if (optionsParam) {
        try {
            const items = optionsParam.split(',');
            const parsedItems = items.map((item: string) => {
                const lastColonIndex = item.lastIndexOf(':');
                if (lastColonIndex === -1) return null;
                const label = item.substring(0, lastColonIndex);
                const val = parseInt(item.substring(lastColonIndex + 1));
                return { label, val };
            }).filter((i): i is { label: string; val: number } => i !== null);

            const total = parsedItems.reduce((sum: number, item: { val: number }) => sum + item.val, 0);
            if (total > 0) {
                options = parsedItems.map((item: { label: string; val: number }, index: number) => ({
                    label: item.label,
                    percentage: Math.round((item.val / total) * 100),
                    color: index === 0 ? '#ef4444' : index === 1 ? '#3b82f6' : '#10b981'
                })).slice(0, 2);
            }
        } catch (e) {
            console.error('Failed to parse options', e);
        }
    }

    // Noto Sans JP フォントを読み込み
    const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap';
    const cssResponse = await fetch(fontCssUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        },
    });
    const css = await cssResponse.text();

    const fontUrlMatch = css.match(/src: url\(([^)]+)\)/);
    if (!fontUrlMatch) {
        return new Response('Font not found', { status: 500 });
    }

    const fontUrl = fontUrlMatch[1];
    const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

    // CSS部分は変更なし

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
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                    fontFamily: 'Noto Sans JP',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* 背景パターン (そのまま) */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', opacity: 0.03 }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ position: 'absolute', top: `${(i * 120) % 500}px`, left: `${(i * 200) % 1100}px`, fontSize: 80, transform: `rotate(${i * 15}deg)` }}>
                            ☑
                        </div>
                    ))}
                </div>

                {/* 上部ライン */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)' }} />

                {/* メインコンテンツ */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px', zIndex: 1, width: '100%' }}>

                    {/* タイトル */}
                    <div style={{
                        fontSize: title.length > 20 ? 48 : title.length > 15 ? 56 : 64,
                        fontWeight: 700,
                        color: '#1e293b',
                        textAlign: 'center',
                        lineHeight: 1.3,
                        maxWidth: 1000,
                        marginBottom: options.length > 0 ? 40 : 20,
                        textShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    }}>
                        {title}
                    </div>

                    {/* 投票グラフ (optionsがある場合のみ) */}
                    {options.length > 0 ? (
                        <div style={{ display: 'flex', width: '90%', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
                            {options.map((opt, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                    <div style={{
                                        width: '100%',
                                        height: 80,
                                        background: '#e2e8f0',
                                        borderRadius: 40,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            width: `${opt.percentage}%`,
                                            background: i === 0 ? 'linear-gradient(90deg, #f87171, #ef4444)' : 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                                            borderRadius: 40,
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: 48,
                                            fontWeight: 900,
                                            color: opt.percentage > 30 ? 'white' : '#64748b',
                                            textShadow: opt.percentage > 30 ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                                        }}>
                                            {opt.percentage}%
                                        </div>
                                    </div>
                                    <div style={{
                                        marginTop: 12,
                                        fontSize: 32,
                                        fontWeight: 700,
                                        color: '#475569',
                                        textAlign: 'center',
                                        display: 'flex', // Flexboxでテキスト制御
                                    }}>
                                        {opt.label}
                                    </div>
                                </div>
                            ))}

                            {/* VS バッジ */}
                            <div style={{
                                position: 'absolute',
                                background: 'white',
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 36,
                                fontWeight: 900,
                                color: '#cbd5e1',
                                border: '4px solid #f1f5f9',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                top: '55%' // 調整が必要かも
                            }}>
                                VS
                            </div>
                        </div>
                    ) : (
                        // オプションがない場合のデフォルト表示
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                            <span style={{ fontSize: 28, color: '#64748b' }}>
                                あなたはどっち派？投票してみよう！
                            </span>
                        </div>
                    )}
                </div>

                {/* フッター */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px', backgroundColor: '#1E90FF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: 'white', borderRadius: 12 }}>
                            <span style={{ fontSize: 28 }}>🗳️</span>
                        </div>
                        <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>なんでも総選挙</span>
                    </div>
                    <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>nandemo-vote.com</div>
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
