import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const SEED_POLLS = [
    // 🍣 食べ物（8問）
    {
        id: 'sushi-last-meal',
        title: '最後に食べたい寿司ネタは？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'マグロ', votes: 0 },
            { id: 'opt-2', label: 'サーモン', votes: 0 },
            { id: 'opt-3', label: 'エビ', votes: 0 },
            { id: 'opt-4', label: 'イクラ', votes: 0 },
        ]
    },
    {
        id: 'curry-spice-level',
        title: 'カレーの辛さ、どれが好き？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '甘口', votes: 0 },
            { id: 'opt-2', label: '中辛', votes: 0 },
            { id: 'opt-3', label: '辛口', votes: 0 },
        ]
    },
    {
        id: 'karaage-lemon',
        title: '唐揚げにレモン、どうする？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'かける', votes: 0 },
            { id: 'opt-2', label: 'かけない', votes: 0 },
        ]
    },
    {
        id: 'ramen-soup',
        title: 'ラーメンのスープ、どこまで飲む？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '全部飲む', votes: 0 },
            { id: 'opt-2', label: '半分くらい', votes: 0 },
            { id: 'opt-3', label: 'ほぼ残す', votes: 0 },
        ]
    },
    {
        id: 'breakfast-type',
        title: '朝ごはん、どっち派？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'ごはん派', votes: 0 },
            { id: 'opt-2', label: 'パン派', votes: 0 },
        ]
    },
    {
        id: 'pizza-crust',
        title: 'ピザの耳、どうしてる？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '必ず食べる', votes: 0 },
            { id: 'opt-2', label: '気分次第', votes: 0 },
            { id: 'opt-3', label: '残す', votes: 0 },
        ]
    },
    {
        id: 'convenience-store',
        title: 'コンビニでよく買うのは？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: 'おにぎり', votes: 0 },
            { id: 'opt-2', label: 'お弁当', votes: 0 },
            { id: 'opt-3', label: 'パン', votes: 0 },
            { id: 'opt-4', label: 'スイーツ', votes: 0 },
        ]
    },
    {
        id: 'dining-out-priority',
        title: '外食で選びがちなのは？',
        genre: '食べ物',
        options: [
            { id: 'opt-1', label: '安さ重視', votes: 0 },
            { id: 'opt-2', label: '味重視', votes: 0 },
            { id: 'opt-3', label: '雰囲気重視', votes: 0 },
        ]
    },
    // 🧠 日常・価値観（6問）
    {
        id: 'line-reply',
        title: 'LINEの返信、どれが普通？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: 'すぐ返す', votes: 0 },
            { id: 'opt-2', label: '余裕あるとき', votes: 0 },
            { id: 'opt-3', label: '気づいたら', votes: 0 },
        ]
    },
    {
        id: 'umbrella-place',
        title: '雨の日、傘はどこに置く？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '玄関', votes: 0 },
            { id: 'opt-2', label: '玄関の外', votes: 0 },
            { id: 'opt-3', label: '部屋の中', votes: 0 },
        ]
    },
    {
        id: 'elevator-button',
        title: 'エレベーターで「開」ボタン押す？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '押す', votes: 0 },
            { id: 'opt-2', label: '押さない', votes: 0 },
        ]
    },
    {
        id: 'sns-notifications',
        title: 'SNSの通知、どうしてる？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '全部ON', votes: 0 },
            { id: 'opt-2', label: '必要なものだけ', votes: 0 },
            { id: 'opt-3', label: 'ほぼOFF', votes: 0 },
        ]
    },
    {
        id: 'free-holiday',
        title: '予定がない休日は？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '家でのんびり', votes: 0 },
            { id: 'opt-2', label: '外に出る', votes: 0 },
            { id: 'opt-3', label: 'その時次第', votes: 0 },
        ]
    },
    {
        id: 'asking-for-help',
        title: '人に頼るのは得意？',
        genre: '日常・価値観',
        options: [
            { id: 'opt-1', label: '得意', votes: 0 },
            { id: 'opt-2', label: '苦手', votes: 0 },
            { id: 'opt-3', label: '相手による', votes: 0 },
        ]
    },
    // 💼 仕事・社会人あるある（4問）
    {
        id: 'leaving-on-time',
        title: '定時退社、どう思う？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: 'できるならしたい', votes: 0 },
            { id: 'opt-2', label: '仕事次第', votes: 0 },
            { id: 'opt-3', label: 'あまり気にしない', votes: 0 },
        ]
    },
    {
        id: 'meetings',
        title: '会議、どうあるべき？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '短く', votes: 0 },
            { id: 'opt-2', label: 'しっかり', votes: 0 },
            { id: 'opt-3', label: 'そもそも不要', votes: 0 },
        ]
    },
    {
        id: 'work-contact-hours',
        title: '仕事の連絡、許せる時間は？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '営業時間内だけ', votes: 0 },
            { id: 'opt-2', label: '夜でもOK', votes: 0 },
            { id: 'opt-3', label: '緊急ならOK', votes: 0 },
        ]
    },
    {
        id: 'boss-drinking',
        title: '上司との飲み会、行く？',
        genre: '仕事・社会人',
        options: [
            { id: 'opt-1', label: '行く', votes: 0 },
            { id: 'opt-2', label: '行かない', votes: 0 },
            { id: 'opt-3', label: '場合による', votes: 0 },
        ]
    },
    // 🎮 趣味・娯楽（2問）
    {
        id: 'movie-watching',
        title: '映画はどう観る？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: '映画館', votes: 0 },
            { id: 'opt-2', label: '家で配信', votes: 0 },
            { id: 'opt-3', label: '気分次第', votes: 0 },
        ]
    },
    {
        id: 'gaming-style',
        title: 'ゲームはどっち派？',
        genre: '趣味・娯楽',
        options: [
            { id: 'opt-1', label: 'ソロプレイ', votes: 0 },
            { id: 'opt-2', label: 'マルチプレイ', votes: 0 },
        ]
    },
    // 🎬 エンタメ系（10問追加）
    {
        id: 'ghibli-best',
        title: 'ジブリ作品で一番好きなのは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: '千と千尋の神隠し', votes: 0 },
            { id: 'opt-2', label: 'となりのトトロ', votes: 0 },
            { id: 'opt-3', label: 'もののけ姫', votes: 0 },
            { id: 'opt-4', label: '天空の城ラピュタ', votes: 0 },
            { id: 'opt-5', label: 'ハウルの動く城', votes: 0 },
            { id: 'opt-6', label: '風の谷のナウシカ', votes: 0 },
            { id: 'opt-7', label: '魔女の宅急便', votes: 0 },
            { id: 'opt-8', label: '紅の豚', votes: 0 },
        ]
    },
    {
        id: 'strongest-hero',
        title: '最強のヒーローは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: '孫悟空', votes: 0 },
            { id: 'opt-2', label: 'ルフィ', votes: 0 },
            { id: 'opt-3', label: 'ナルト', votes: 0 },
            { id: 'opt-4', label: '竈門炭治郎', votes: 0 },
            { id: 'opt-5', label: '五条悟', votes: 0 },
            { id: 'opt-6', label: 'オールマイト', votes: 0 },
        ]
    },
    {
        id: 'best-variety',
        title: '一番面白いバラエティ番組は？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: '水曜日のダウンタウン', votes: 0 },
            { id: 'opt-2', label: 'アメトーーク', votes: 0 },
            { id: 'opt-3', label: 'ロンドンハーツ', votes: 0 },
            { id: 'opt-4', label: 'IPPONグランプリ', votes: 0 },
            { id: 'opt-5', label: '有吉の壁', votes: 0 },
        ]
    },
    {
        id: 'favorite-game',
        title: '一番ハマったゲームは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'マインクラフト', votes: 0 },
            { id: 'opt-2', label: 'ポケモン', votes: 0 },
            { id: 'opt-3', label: 'スマブラ', votes: 0 },
            { id: 'opt-4', label: 'マリオカート', votes: 0 },
            { id: 'opt-5', label: 'あつまれどうぶつの森', votes: 0 },
            { id: 'opt-6', label: 'スプラトゥーン', votes: 0 },
            { id: 'opt-7', label: 'Apex Legends', votes: 0 },
            { id: 'opt-8', label: 'フォートナイト', votes: 0 },
        ]
    },
    {
        id: 'rpg-class',
        title: 'RPGで最初に選ぶのは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: '戦士', votes: 0 },
            { id: 'opt-2', label: '魔法使い', votes: 0 },
            { id: 'opt-3', label: '僧侶', votes: 0 },
            { id: 'opt-4', label: '盗賊', votes: 0 },
            { id: 'opt-5', label: '弓使い', votes: 0 },
        ]
    },
    {
        id: 'karaoke-genre',
        title: 'カラオケで歌うジャンルは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'アニソン', votes: 0 },
            { id: 'opt-2', label: 'J-POP', votes: 0 },
            { id: 'opt-3', label: 'ボカロ', votes: 0 },
            { id: 'opt-4', label: '懐メロ', votes: 0 },
            { id: 'opt-5', label: '洋楽', votes: 0 },
            { id: 'opt-6', label: 'K-POP', votes: 0 },
        ]
    },
    {
        id: 'youtube-genre',
        title: '好きなYouTubeジャンルは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'ゲーム実況', votes: 0 },
            { id: 'opt-2', label: 'Vtuber', votes: 0 },
            { id: 'opt-3', label: '料理', votes: 0 },
            { id: 'opt-4', label: '検証・やってみた', votes: 0 },
            { id: 'opt-5', label: '旅行・Vlog', votes: 0 },
            { id: 'opt-6', label: '雑学・解説', votes: 0 },
        ]
    },
    {
        id: 'cat-vs-dog',
        title: '猫派 vs 犬派',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: '猫派', votes: 0 },
            { id: 'opt-2', label: '犬派', votes: 0 },
            { id: 'opt-3', label: '両方好き', votes: 0 },
            { id: 'opt-4', label: 'どっちも苦手', votes: 0 },
        ]
    },
    {
        id: 'kinoko-takenoko',
        title: 'きのこの山 vs たけのこの里',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'きのこの山', votes: 0 },
            { id: 'opt-2', label: 'たけのこの里', votes: 0 },
            { id: 'opt-3', label: 'どっちも好き', votes: 0 },
        ]
    },
    {
        id: 'burger-chain',
        title: '好きなハンバーガーチェーンは？',
        genre: 'エンタメ',
        options: [
            { id: 'opt-1', label: 'マクドナルド', votes: 0 },
            { id: 'opt-2', label: 'モスバーガー', votes: 0 },
            { id: 'opt-3', label: 'ケンタッキー', votes: 0 },
            { id: 'opt-4', label: 'ロッテリア', votes: 0 },
        ]
    },
];

export async function POST() {
    const results = [];

    for (const poll of SEED_POLLS) {
        // Check if poll already exists
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
        message: `Processed ${SEED_POLLS.length} polls`,
        results
    });
}
