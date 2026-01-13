import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const SEED_POLLS_V2 = [
    // 🍣 食べ物（4問）
    {
        id: 'best-ramen-flavor',
        title: '一番好きなラーメンの味は？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '醤油', votes: 0 },
            { id: 'opt-2', label: '味噌', votes: 0 },
            { id: 'opt-3', label: '塩', votes: 0 },
            { id: 'opt-4', label: '豚骨', votes: 0 },
            { id: 'opt-5', label: '担々麺', votes: 0 },
            { id: 'opt-6', label: '家系', votes: 0 },
            { id: 'opt-7', label: '二郎系', votes: 0 },
        ]
    },
    {
        id: 'favorite-snack',
        title: '一番好きなお菓子のジャンルは？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'チョコレート', votes: 0 },
            { id: 'opt-2', label: 'ポテトチップス', votes: 0 },
            { id: 'opt-3', label: 'グミ', votes: 0 },
            { id: 'opt-4', label: 'クッキー', votes: 0 },
            { id: 'opt-5', label: 'せんべい', votes: 0 },
            { id: 'opt-6', label: 'アイス', votes: 0 },
            { id: 'opt-7', label: 'ケーキ', votes: 0 },
            { id: 'opt-8', label: 'プリン', votes: 0 },
        ]
    },
    {
        id: 'drink-choice',
        title: 'よく飲む飲み物は？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '水・ミネラルウォーター', votes: 0 },
            { id: 'opt-2', label: 'お茶', votes: 0 },
            { id: 'opt-3', label: 'コーヒー', votes: 0 },
            { id: 'opt-4', label: 'ジュース', votes: 0 },
            { id: 'opt-5', label: '炭酸飲料', votes: 0 },
            { id: 'opt-6', label: 'エナジードリンク', votes: 0 },
        ]
    },
    {
        id: 'sushi-order',
        title: '回転寿司で最初に取るネタは？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'サーモン', votes: 0 },
            { id: 'opt-2', label: 'マグロ', votes: 0 },
            { id: 'opt-3', label: 'えびアボカド', votes: 0 },
            { id: 'opt-4', label: 'ハマチ', votes: 0 },
            { id: 'opt-5', label: 'たまご', votes: 0 },
            { id: 'opt-6', label: 'いくら', votes: 0 },
            { id: 'opt-7', label: 'えんがわ', votes: 0 },
        ]
    },

    // 🧠 日常・価値観（4問）
    {
        id: 'wake-up-time',
        title: '理想の起床時間は？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '5時台', votes: 0 },
            { id: 'opt-2', label: '6時台', votes: 0 },
            { id: 'opt-3', label: '7時台', votes: 0 },
            { id: 'opt-4', label: '8時台', votes: 0 },
            { id: 'opt-5', label: '9時台', votes: 0 },
            { id: 'opt-6', label: '10時以降', votes: 0 },
        ]
    },
    {
        id: 'stress-relief',
        title: 'ストレス解消法は？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '寝る', votes: 0 },
            { id: 'opt-2', label: '食べる', votes: 0 },
            { id: 'opt-3', label: '運動する', votes: 0 },
            { id: 'opt-4', label: 'ゲームする', votes: 0 },
            { id: 'opt-5', label: '音楽を聴く', votes: 0 },
            { id: 'opt-6', label: '友達と話す', votes: 0 },
            { id: 'opt-7', label: '買い物する', votes: 0 },
            { id: 'opt-8', label: 'お酒を飲む', votes: 0 },
        ]
    },
    {
        id: 'money-priority',
        title: 'お金を使うなら何に？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '食事・グルメ', votes: 0 },
            { id: 'opt-2', label: '旅行', votes: 0 },
            { id: 'opt-3', label: '趣味', votes: 0 },
            { id: 'opt-4', label: 'ファッション', votes: 0 },
            { id: 'opt-5', label: '貯金', votes: 0 },
            { id: 'opt-6', label: '自己投資', votes: 0 },
            { id: 'opt-7', label: '推し活', votes: 0 },
        ]
    },
    {
        id: 'sleep-position',
        title: '寝るときの姿勢は？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '仰向け', votes: 0 },
            { id: 'opt-2', label: 'うつ伏せ', votes: 0 },
            { id: 'opt-3', label: '右向き', votes: 0 },
            { id: 'opt-4', label: '左向き', votes: 0 },
            { id: 'opt-5', label: '毎回変わる', votes: 0 },
        ]
    },

    // 💼 仕事・社会人（4問）
    {
        id: 'work-motivation',
        title: '仕事のモチベーションは？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '給料', votes: 0 },
            { id: 'opt-2', label: 'やりがい', votes: 0 },
            { id: 'opt-3', label: '成長', votes: 0 },
            { id: 'opt-4', label: '人間関係', votes: 0 },
            { id: 'opt-5', label: '安定', votes: 0 },
            { id: 'opt-6', label: '自由な時間', votes: 0 },
        ]
    },
    {
        id: 'ideal-work-style',
        title: '理想の働き方は？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '完全出社', votes: 0 },
            { id: 'opt-2', label: '完全リモート', votes: 0 },
            { id: 'opt-3', label: 'ハイブリッド', votes: 0 },
            { id: 'opt-4', label: 'フリーランス', votes: 0 },
            { id: 'opt-5', label: '起業', votes: 0 },
            { id: 'opt-6', label: 'FIRE', votes: 0 },
        ]
    },
    {
        id: 'lunch-budget',
        title: 'ランチの予算は？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '500円以下', votes: 0 },
            { id: 'opt-2', label: '500〜800円', votes: 0 },
            { id: 'opt-3', label: '800〜1000円', votes: 0 },
            { id: 'opt-4', label: '1000〜1500円', votes: 0 },
            { id: 'opt-5', label: '1500円以上', votes: 0 },
            { id: 'opt-6', label: 'お弁当派', votes: 0 },
        ]
    },
    {
        id: 'commute-time',
        title: '許容できる通勤時間は？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '15分以内', votes: 0 },
            { id: 'opt-2', label: '30分以内', votes: 0 },
            { id: 'opt-3', label: '45分以内', votes: 0 },
            { id: 'opt-4', label: '1時間以内', votes: 0 },
            { id: 'opt-5', label: '1時間半以内', votes: 0 },
            { id: 'opt-6', label: '通勤なし希望', votes: 0 },
        ]
    },

    // 🎮 趣味・娯楽（4問）
    {
        id: 'hobby-time',
        title: '趣味に使う時間は週何時間？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: '5時間未満', votes: 0 },
            { id: 'opt-2', label: '5〜10時間', votes: 0 },
            { id: 'opt-3', label: '10〜20時間', votes: 0 },
            { id: 'opt-4', label: '20〜30時間', votes: 0 },
            { id: 'opt-5', label: '30時間以上', votes: 0 },
        ]
    },
    {
        id: 'travel-style',
        title: '旅行のスタイルは？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: '一人旅', votes: 0 },
            { id: 'opt-2', label: '友達と', votes: 0 },
            { id: 'opt-3', label: '家族と', votes: 0 },
            { id: 'opt-4', label: 'カップルで', votes: 0 },
            { id: 'opt-5', label: 'ツアー参加', votes: 0 },
            { id: 'opt-6', label: '旅行しない', votes: 0 },
        ]
    },
    {
        id: 'music-genre',
        title: 'よく聴く音楽のジャンルは？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: 'J-POP', votes: 0 },
            { id: 'opt-2', label: 'K-POP', votes: 0 },
            { id: 'opt-3', label: '洋楽', votes: 0 },
            { id: 'opt-4', label: 'ロック', votes: 0 },
            { id: 'opt-5', label: 'ヒップホップ', votes: 0 },
            { id: 'opt-6', label: 'アニソン', votes: 0 },
            { id: 'opt-7', label: 'ボカロ', votes: 0 },
            { id: 'opt-8', label: 'クラシック', votes: 0 },
        ]
    },
    {
        id: 'book-or-movie',
        title: '本と映画、どっちが好き？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: '本（小説）', votes: 0 },
            { id: 'opt-2', label: '本（漫画）', votes: 0 },
            { id: 'opt-3', label: '映画', votes: 0 },
            { id: 'opt-4', label: 'ドラマ', votes: 0 },
            { id: 'opt-5', label: 'アニメ', votes: 0 },
            { id: 'opt-6', label: 'どれも見ない', votes: 0 },
        ]
    },

    // 🎬 エンタメ（4問）
    {
        id: 'favorite-disney',
        title: '好きなディズニー作品は？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'アナと雪の女王', votes: 0 },
            { id: 'opt-2', label: 'リトルマーメイド', votes: 0 },
            { id: 'opt-3', label: '美女と野獣', votes: 0 },
            { id: 'opt-4', label: 'トイストーリー', votes: 0 },
            { id: 'opt-5', label: 'ライオンキング', votes: 0 },
            { id: 'opt-6', label: 'アラジン', votes: 0 },
            { id: 'opt-7', label: 'モンスターズインク', votes: 0 },
        ]
    },
    {
        id: 'streaming-service',
        title: 'メインで使う動画配信サービスは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'Netflix', votes: 0 },
            { id: 'opt-2', label: 'Amazon Prime', votes: 0 },
            { id: 'opt-3', label: 'Disney+', votes: 0 },
            { id: 'opt-4', label: 'U-NEXT', votes: 0 },
            { id: 'opt-5', label: 'Hulu', votes: 0 },
            { id: 'opt-6', label: 'YouTube', votes: 0 },
            { id: 'opt-7', label: 'TVer', votes: 0 },
            { id: 'opt-8', label: '使っていない', votes: 0 },
        ]
    },
    {
        id: 'favorite-pokemon',
        title: '好きなポケモンのタイプは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'ほのお', votes: 0 },
            { id: 'opt-2', label: 'みず', votes: 0 },
            { id: 'opt-3', label: 'くさ', votes: 0 },
            { id: 'opt-4', label: 'でんき', votes: 0 },
            { id: 'opt-5', label: 'エスパー', votes: 0 },
            { id: 'opt-6', label: 'ドラゴン', votes: 0 },
            { id: 'opt-7', label: 'あく', votes: 0 },
            { id: 'opt-8', label: 'フェアリー', votes: 0 },
        ]
    },
    {
        id: 'favorite-nintendo',
        title: '一番好きな任天堂シリーズは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'マリオ', votes: 0 },
            { id: 'opt-2', label: 'ゼルダ', votes: 0 },
            { id: 'opt-3', label: 'ポケモン', votes: 0 },
            { id: 'opt-4', label: 'どうぶつの森', votes: 0 },
            { id: 'opt-5', label: 'スプラトゥーン', votes: 0 },
            { id: 'opt-6', label: 'スマブラ', votes: 0 },
            { id: 'opt-7', label: 'カービィ', votes: 0 },
        ]
    },

    // 📱 テクノロジー（4問）
    {
        id: 'smartphone-brand',
        title: '使っているスマホは？',
        genre: 'テクノロジー',
        options: [
            { id: 'opt-1', label: 'iPhone', votes: 0 },
            { id: 'opt-2', label: 'Samsung Galaxy', votes: 0 },
            { id: 'opt-3', label: 'Google Pixel', votes: 0 },
            { id: 'opt-4', label: 'Xperia', votes: 0 },
            { id: 'opt-5', label: 'AQUOS', votes: 0 },
            { id: 'opt-6', label: 'その他Android', votes: 0 },
        ]
    },
    {
        id: 'sns-most-used',
        title: '一番使うSNSは？',
        genre: 'テクノロジー',
        options: [
            { id: 'opt-1', label: 'X (Twitter)', votes: 0 },
            { id: 'opt-2', label: 'Instagram', votes: 0 },
            { id: 'opt-3', label: 'TikTok', votes: 0 },
            { id: 'opt-4', label: 'YouTube', votes: 0 },
            { id: 'opt-5', label: 'LINE', votes: 0 },
            { id: 'opt-6', label: 'Facebook', votes: 0 },
            { id: 'opt-7', label: 'Threads', votes: 0 },
            { id: 'opt-8', label: 'SNS使わない', votes: 0 },
        ]
    },
    {
        id: 'ai-usage',
        title: 'AIをどのくらい使ってる？',
        genre: 'テクノロジー',
        options: [
            { id: 'opt-1', label: '毎日使う', votes: 0 },
            { id: 'opt-2', label: '週に数回', votes: 0 },
            { id: 'opt-3', label: '月に数回', votes: 0 },
            { id: 'opt-4', label: 'たまに使う', votes: 0 },
            { id: 'opt-5', label: '使ったことない', votes: 0 },
            { id: 'opt-6', label: 'AIって何？', votes: 0 },
        ]
    },
    {
        id: 'payment-method',
        title: 'メインの決済方法は？',
        genre: 'テクノロジー',
        options: [
            { id: 'opt-1', label: '現金', votes: 0 },
            { id: 'opt-2', label: 'クレジットカード', votes: 0 },
            { id: 'opt-3', label: 'PayPay', votes: 0 },
            { id: 'opt-4', label: '交通系IC', votes: 0 },
            { id: 'opt-5', label: 'QUICPay/iD', votes: 0 },
            { id: 'opt-6', label: 'Apple Pay', votes: 0 },
            { id: 'opt-7', label: 'その他QR決済', votes: 0 },
        ]
    },

    // 👥 人間関係（3問）
    {
        id: 'friend-count',
        title: '親友と呼べる人は何人？',
        genre: '人間関係',
        options: [
            { id: 'opt-1', label: '0人', votes: 0 },
            { id: 'opt-2', label: '1人', votes: 0 },
            { id: 'opt-3', label: '2〜3人', votes: 0 },
            { id: 'opt-4', label: '4〜5人', votes: 0 },
            { id: 'opt-5', label: '6人以上', votes: 0 },
        ]
    },
    {
        id: 'introvert-extrovert',
        title: '自分はどっち寄り？',
        genre: '人間関係',
        options: [
            { id: 'opt-1', label: '完全に内向的', votes: 0 },
            { id: 'opt-2', label: 'やや内向的', votes: 0 },
            { id: 'opt-3', label: 'どちらでもない', votes: 0 },
            { id: 'opt-4', label: 'やや外向的', votes: 0 },
            { id: 'opt-5', label: '完全に外向的', votes: 0 },
        ]
    },
    {
        id: 'conflict-style',
        title: '意見が対立したときは？',
        genre: '人間関係',
        options: [
            { id: 'opt-1', label: '自分の意見を主張', votes: 0 },
            { id: 'opt-2', label: '相手に合わせる', votes: 0 },
            { id: 'opt-3', label: '妥協点を探す', votes: 0 },
            { id: 'opt-4', label: '距離を置く', votes: 0 },
            { id: 'opt-5', label: '第三者に相談', votes: 0 },
        ]
    },

    // ⚡ 究極の選択（3問）
    {
        id: 'superpower',
        title: '一つだけ超能力が使えるなら？',
        genre: '究極の選択',
        options: [
            { id: 'opt-1', label: '透明化', votes: 0 },
            { id: 'opt-2', label: '空を飛ぶ', votes: 0 },
            { id: 'opt-3', label: 'テレポート', votes: 0 },
            { id: 'opt-4', label: '時間停止', votes: 0 },
            { id: 'opt-5', label: '読心術', votes: 0 },
            { id: 'opt-6', label: '不老不死', votes: 0 },
            { id: 'opt-7', label: '超怪力', votes: 0 },
        ]
    },
    {
        id: 'time-travel',
        title: '過去と未来、行けるならどっち？',
        genre: '究極の選択',
        options: [
            { id: 'opt-1', label: '過去（変更可能）', votes: 0 },
            { id: 'opt-2', label: '過去（見るだけ）', votes: 0 },
            { id: 'opt-3', label: '未来（変更可能）', votes: 0 },
            { id: 'opt-4', label: '未来（見るだけ）', votes: 0 },
            { id: 'opt-5', label: 'どちらも行きたくない', votes: 0 },
        ]
    },
    {
        id: 'island-item',
        title: '無人島に一つ持っていくなら？',
        genre: '究極の選択',
        options: [
            { id: 'opt-1', label: 'ナイフ', votes: 0 },
            { id: 'opt-2', label: 'ライター', votes: 0 },
            { id: 'opt-3', label: 'ロープ', votes: 0 },
            { id: 'opt-4', label: '大量の水', votes: 0 },
            { id: 'opt-5', label: 'サバイバル本', votes: 0 },
            { id: 'opt-6', label: '衛星電話', votes: 0 },
        ]
    },
];

export async function POST() {
    const results = [];

    for (const poll of SEED_POLLS_V2) {
        const { data: existing } = await supabase
            .from('polls')
            .select('id')
            .eq('id', poll.id)
            .single();

        if (existing) {
            results.push({ id: poll.id, status: 'skipped (exists)' });
            continue;
        }

        const { error } = await supabase.from('polls').insert([{
            id: poll.id,
            title: poll.title,
            genre: poll.genre,
            description: '',
            image_url: '',
            options: poll.options
        }]);

        if (error) {
            results.push({ id: poll.id, status: 'error', error: error.message });
        } else {
            results.push({ id: poll.id, status: 'created' });
        }
    }

    return NextResponse.json({
        message: `Processed ${SEED_POLLS_V2.length} polls`,
        results
    });
}
