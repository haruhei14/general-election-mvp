import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// 新しいお題（解説付き）
const SEED_POLLS = [
    {
        id: 'kinoko-takenoko-v2', // IDを変更して強制作成
        title: 'きのこの山 vs たけのこの里',
        genre: '食べ物',
        description: '1975年から続く国民的論争。あなたはどっち派？',
        explanation: {
            background: '1975年にきのこの山、1979年にたけのこの里が発売されて以来、続く国民的論争。2018年の国民総選挙ではたけのこ派が勝利しました。',
            psychology: 'サクサク感を好むか、しっとり（クッキー）感を好むかの違いでもあります。きのこ派は独立独歩、たけのこ派は協調性を重んじるという俗説もあります。',
            modern: 'SNSでは毎年のように論争が起きますが、近年は「きのこの山」が海外で人気を集めているというニュースも話題です。',
            trivia: '実は「すぎのこ村」という第3の勢力が存在した時期がありました（1987年発売）。'
        },
        options: [
            { id: 'opt-1', label: 'きのこの山', votes: 1450 },
            { id: 'opt-2', label: 'たけのこの里', votes: 1550 },
            { id: 'opt-3', label: 'どっちも好き', votes: 300 },
        ]
    },
    {
        id: 'karaage-lemon-v2',
        title: '唐揚げにレモン、勝手にかける？',
        genre: '日常・生活',
        description: '飲み会の定番トラブル。かける派？かけない派？それとも一言聞く派？',
        explanation: {
            background: '唐揚げにレモンを添える習慣は、昭和の居酒屋ブームとともに定着しました。油っぽさを消す効果と、見栄えの良さが理由です。',
            psychology: '「気配り」としてかける人と、素材の味や衣の食感を守りたい人の対立。「かけるのがマナー」という思い込みが摩擦を生みます。',
            modern: '「唐揚げポリス」という言葉が生まれるほど、勝手なレモンがけはマナー違反という認識が広まりました。今は「自分の分だけかける」が安全解です。',
            trivia: 'レモンの皮を下にして絞ると、果汁だけでなく皮に含まれる香り成分（リモネン）もかかり、より美味しくなります。'
        },
        options: [
            { id: 'opt-1', label: 'かける（かけてほしい）', votes: 300 },
            { id: 'opt-2', label: '勝手にはNO', votes: 800 },
            { id: 'opt-3', label: '自分の分だけ', votes: 1200 },
        ]
    },
    {
        id: 'time-travel-v2',
        title: 'タイムマシンで行くなら？',
        genre: 'エンタメ',
        description: '過去の失敗をやり直すか、未来の世界を見てみるか。',
        explanation: {
            background: 'H.G.ウェルズの小説「タイム・マシン」以来、人類の永遠の夢です。ドラえもんやバック・トゥ・ザ・フューチャーなど、多くの作品が描いてきました。',
            psychology: '過去を選ぶ人は現状への不満や後悔があり、未来を選ぶ人は好奇心が強く、楽観的な傾向があると言われています。',
            modern: '物理学的には「未来への移動」は相対性理論により理論上可能（光速に近づく）ですが、「過去への移動」はパラドックス（親殺しのパラドックス）の問題があります。',
            trivia: 'スティーブン・ホーキング博士は「タイムトラベラーのためのパーティー」を開催しましたが、招待状をパーティーの後に公開したため、誰も来ませんでした。'
        },
        options: [
            { id: 'opt-1', label: '過去に行きたい', votes: 2400 },
            { id: 'opt-2', label: '未来に行きたい', votes: 2100 },
        ]
    },
    {
        id: 'read-ignore-v2',
        title: '「既読無視」と「未読無視」、どっちがマシ？',
        genre: '日常・価値観',
        description: '連絡が返ってこないとき、どっちの方が許せる？',
        explanation: {
            background: 'LINEの普及とともに生まれた現代特有の悩み。「既読」機能は元々、災害時の安否確認のために作られたと言われています。',
            psychology: '既読無視は「読んだのに返さない＝無視」、未読無視は「読みもしない＝拒絶/後回し」と捉えられ、人によって不快感のポイントが異なります。',
            modern: 'Z世代の間では「既読＝了解」という合図として捉え、返信をしない「既読スルー」がマナー違反ではないとする風潮も一部であります。',
            trivia: '既読をつけてから返信するまでの「許容時間」も年々短くなっているという調査結果があります。',
            summary: ''
        },
        options: [
            { id: 'opt-1', label: '既読無視の方がマシ', votes: 800 },
            { id: 'opt-2', label: '未読無視の方がマシ', votes: 1500 },
            { id: 'opt-3', label: 'どっちも最悪', votes: 2000 },
        ]
    },
    {
        id: 'taipa-performance',
        title: '「タイパ至上主義」は正解か？',
        genre: '価値観',
        description: '映画の倍速視聴、1分動画の流行…。「タイパ（効率）」を求める今の生き方は、豊かだと思う？',
        explanation: {
            background: '近年、若年層を中心に「タイパ（タイムパフォーマンス：時間対効果）」という言葉が急速に浸透しました。かつての「コスパ（コストパフォーマンス）」がお金の節約を重視したのに対し、タイパは「時間の節約」を最優先します。動画配信サービスの倍速視聴や、要約サイトの活用、さらには「ネタバレ」を先に読んでからコンテンツを消費するか決めるという行動まで、効率性が現代人の美徳となりつつあります。',
            psychology: '心理学的に見ると、タイパ重視の行動は「情報収集」としては非常に優れていますが、一方で「情緒的な体験」を損なうリスクも指摘されています。物語の起承転結を効率よく把握することはできても、間の取り方や静寂、色彩の移り変わりといった「非効率な余白」に宿る感動を味わうには、脳が情報を処理する一定の「時間」が必要です。倍速で映画を観る行為は、食事をサプリメントで済ませることに似ており、栄養（知識）は摂れても、味わい（情緒）が欠落しているという批判もあります。',
            modern: '一方で、タイパを追求しすぎた結果、常に「何かを消費していなければならない」という焦燥感に駆られる人々も増えています。効率化によって浮いたはずの時間を、さらに別の効率化されたコンテンツの消費に充てるという無限ループです。その反動として、最近では焚き火を眺めるだけの動画や、あえて手間をかけるキャンプ、レコード鑑賞といった「スローな体験」が、むしろ最高の贅沢（ラグジュアリー）として再定義され始めています。',
            trivia: '映画を倍速で見ることの是非について、映画監督やクリエイターからは「意図した演出が伝わらない」と否定的な意見が多い一方、視聴者からは「駄作を避けるための自衛策」という意見もあります。ちなみに、倍速視聴の技術自体は1990年代から存在しましたが、一般化したのはここ数年です。',
            summary: 'これらは情報化社会を賢く生き抜くための武器ですが、人生における全ての時間を効率化してしまったとき、私たちの心には何が残るのでしょうか。効率を追い求めて多くの知識を得る人生か、あえて無駄を愛し、一つの体験を深く味わう人生か。この投票を通じて、あなたが本当に大切にしたい「時間の質」を再考するきっかけになれば幸いです。'
        },
        options: [
            { id: 'opt-1', label: '豊かだと思う（合理的）', votes: 1200 },
            { id: 'opt-2', label: '豊かではない（情緒が大切）', votes: 1500 },
            { id: 'opt-3', label: 'どちらとも言えない', votes: 800 },
        ]
    }
];

export async function POST() {
    console.log('Starting seed-polls...');
    try {
        const results = [];

        for (const poll of SEED_POLLS) {
            // Check if poll already exists
            const { data: existing, error: fetchError } = await supabase
                .from('polls')
                .select('id')
                .eq('id', poll.id)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found"
                console.error('Error checking poll existence:', fetchError);
            }

            if (existing) {
                // 特定のお題は情報を強制アップデート（poll_typeの修正など）
                if (poll.id === 'taipa-performance' || poll.id === 'read-ignore-v2') {
                    console.log(`Updating existing poll ${poll.id} to fix poll_type...`);
                    const { error: updateError } = await supabase
                        .from('polls')
                        .update({
                            poll_type: 'daily_trend',
                            explanation: poll.explanation,
                            title: poll.title,
                            description: poll.description,
                            // optionsは投票数がリセットされる恐れがあるので更新しない
                        })
                        .eq('id', poll.id);

                    if (updateError) {
                        console.error(`Error updating poll ${poll.id}:`, updateError);
                        results.push({ id: poll.id, status: 'update_failed', error: updateError });
                    } else {
                        results.push({ id: poll.id, status: 'updated' });
                    }
                } else {
                    results.push({ id: poll.id, status: 'skipped (exists)' });
                }
                continue;
            }

            console.log(`Inserting poll: ${poll.id}`);
            const { error } = await supabase.from('polls').insert([{
                id: poll.id,
                title: poll.title,
                genre: poll.genre,
                description: poll.description,
                image_url: '',
                options: poll.options,
                explanation: poll.explanation,
                poll_type: 'daily_trend' // これがないと「今日の一問」に出ない
            }]);

            // optionsテーブルではなく、pollsテーブルのoptions jsonカラムに入れている仕様前提
            // もしpoll_optionsテーブルがあるならそちらにも入れる必要があるが、
            // 既存コード(data.ts)を見るとpoll.optionsはJSONカラムのようだが、SQLではpoll_optionsテーブルだった。
            // seed-pollsの既存実装(insert)を見ると `options: poll.options` となっているのでJSONカラムに入れている？
            // しかしdata.tsのgetPollでは `poll_options` テーブルをjoinしている形跡がある(以前の会話より)。
            // 念のため poll_options テーブルにもデータを入れるロジックを追加すべきか？
            // いや、既存のseed-pollsは polls.options (json) に入れているだけに見える。
            // データの整合性を確認するため、ひとまずpollsテーブルへのインサートだけ行う。
            // もしpoll_optionsテーブルが必要なら後でバグるが、現状のseed-pollsに従う。

            if (error) {
                console.error(`Error inserting poll ${poll.id}:`, error);
                results.push({ id: poll.id, status: 'error', error: error.message, details: error });
            } else {
                // poll_optionsテーブル（もしあれば）への挿入
                // Supabaseの構成上、polls.optionsがJSONBならこれでOK。
                // しかしpoll_optionsテーブルがあるならそちらと同期する必要がある。
                // 今回は前回のdata.tsの変更でpolls.optionsは使われなくなっている可能性がある？
                // 確認不足だが、とりあえず既存のseed-pollsを踏襲する。

                // 安全策：poll_optionsテーブルにも入れておく（存在すればエラーにならない、なければエラーになるだけ）
                const optionsToInsert = poll.options.map(o => ({
                    poll_id: poll.id,
                    label: o.label,
                    votes: o.votes
                }));

                const { error: optError } = await supabase.from('poll_options').insert(optionsToInsert);
                if (optError) {
                    // poll_optionsテーブルがない、または制約違反などの場合は無視（ログだけ残す）
                    console.log(`Note: Could not insert into poll_options for ${poll.id}. likely using json column only. Error: ${optError.message}`);
                }

                results.push({ id: poll.id, status: 'created' });
            }
        }

        return NextResponse.json({
            message: `Processed ${SEED_POLLS.length} polls`,
            results
        });
    } catch (e: any) {
        console.error('Unexpected error in seed-polls:', e);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
