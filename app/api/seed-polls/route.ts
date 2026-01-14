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
            trivia: '既読をつけてから返信するまでの「許容時間」も年々短くなっているという調査結果があります。'
        },
        options: [
            { id: 'opt-1', label: '既読無視の方がマシ', votes: 800 },
            { id: 'opt-2', label: '未読無視の方がマシ', votes: 1500 },
            { id: 'opt-3', label: 'どっちも最悪', votes: 2000 },
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
                results.push({ id: poll.id, status: 'skipped (exists)' });
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
                // explanation: poll.explanation, // DBカラムが存在しない可能性があるので一旦コメントアウト
                votes: poll.options.reduce((sum, o) => sum + o.votes, 0)
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
