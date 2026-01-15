
export type MarugotoTheme = {
    id: string; // e.g. 'onepiece'
    title: string;
    description: string;
    icon: string; // emoji or lucide icon name (handled in component)
    image?: string; // Custom theme image path
    color: string; // Tailwind class for gradient
    questionIds: string[]; // List of poll IDs
    aiColumn: {
        title: string;
        content: string;
    };
    isNew?: boolean;
};

export const MARUGOTO_THEMES: MarugotoTheme[] = [
    {
        id: 'onepiece',
        title: 'ワンピース',
        description: '誰もが知る王道の名作。あなたの「推し」や「価値観」を10問で徹底解剖！',
        icon: 'Anchor', // Lucide icon
        image: '/onepiece-theme-card.png',
        color: 'from-blue-500 to-cyan-400', // 海のイメージ
        isNew: false,
        questionIds: [
            'marugoto_onepiece_q1',
            'marugoto_onepiece_q2',
            'marugoto_onepiece_q3',
            'marugoto_onepiece_q4',
            'marugoto_onepiece_q5',
            'marugoto_onepiece_q6',
            'marugoto_onepiece_q7',
            'marugoto_onepiece_q8',
            'marugoto_onepiece_q9',
            'marugoto_onepiece_q10',
        ],
        aiColumn: {
            title: '【AI分析】ワンピースから見るあなたの冒険観',
            content: `ワンピースという物語は、単なる能力バトルではなく、それぞれのキャラクターが抱く「正義」や「夢」のぶつかり合いです。
あなたが選んだ選択肢からは、現実世界において大切にしている価値観が見えてきます。

例えば「最強のキャラ」にロジャーや白ひげ（旧時代の伝説）を選んだあなたは、伝統や実績を重んじるタイプかもしれません。一方でルフィや黒ひげ（新時代の主役）を選んだあなたは、変革や可能性に賭けるチャレンジャー気質があると言えるでしょう。

「上司にしたいキャラ」も興味深いポイントです。シャンクスのように「自由」を愛するリーダーか、白ひげのように「家族」を守るリーダーか、あるいはサカズキのように「徹底的」なルールを敷くリーダーか。これらはまさに、現代組織論におけるリーダーシップのスタイルそのものです。

この「まるごと総選挙」を通じて、あなたの心の羅針盤（ログポース）がどこを指しているのか、改めて見つめ直すきっかけになれば幸いです。同じ「ワンピース好き」でも、見ている景色は一人ひとり全く違う。だからこそ、この大航海時代は面白いのです。`
        }
    },
    {
        id: 'backnumber',
        title: 'back number',
        description: '心に刺さる歌詞と切ないメロディ。あなたの好きな曲や思い出の1曲を10問で探る！',
        icon: 'Music', // Lucide icon
        color: 'from-slate-700 to-slate-500', // シンプルでモダンなグレー
        isNew: false,
        questionIds: [
            'marugoto_backnumber_q1',
            'marugoto_backnumber_q2',
            'marugoto_backnumber_q3',
            'marugoto_backnumber_q4',
            'marugoto_backnumber_q5',
            'marugoto_backnumber_q6',
            'marugoto_backnumber_q7',
            'marugoto_backnumber_q8',
            'marugoto_backnumber_q9',
            'marugoto_backnumber_q10',
        ],
        aiColumn: {
            title: '【AI分析】back numberから見るあなたの恋愛観',
            content: `back numberの楽曲は、恋愛における「リアルな感情」を赤裸々に描いています。
あなたが選んだ曲からは、恋愛に対するスタンスや、普段は言葉にしない想いが見えてきます。

「水平線」や「瞬き」を選んだあなたは、日常の中にある小さな幸せを大切にするタイプ。
「花束」や「クリスマスソング」を選んだあなたは、どこか切なさを抱えながらも、誰かを深く愛することができる人。
「高嶺の花子さん」や「大不正解」を選んだあなたは、片思いや報われない恋にも前向きに立ち向かう強さを持っています。

清水依与吏が紡ぐ言葉たちは、聴く人それぞれの物語と重なり合い、「あ、これ私のことだ」と思わせる魔法を持っています。

この総選挙を通じて、自分が何を求めているのか、どんな恋をしたいのか——少しだけ見えてきたのではないでしょうか。back numberの曲がこれからもあなたの日常に寄り添ってくれますように。`
        }
    },
    {
        id: 'm1',
        title: 'M-1グランプリ',
        description: '漫才日本一を決める年末の祭典。あなたの笑いのセンスを10問で診断！',
        icon: 'Mic', // Lucide icon
        color: 'from-red-600 to-orange-500', // M-1のイメージカラー
        isNew: true,
        questionIds: [
            'marugoto_m1_q1',
            'marugoto_m1_q2',
            'marugoto_m1_q3',
            'marugoto_m1_q4',
            'marugoto_m1_q5',
            'marugoto_m1_q6',
            'marugoto_m1_q7',
            'marugoto_m1_q8',
            'marugoto_m1_q9',
            'marugoto_m1_q10',
        ],
        aiColumn: {
            title: '【AI分析】M-1から見るあなたの笑いのセンス',
            content: `M-1グランプリは、わずか4分間に芸人の全てが凝縮される究極の舞台です。
あなたが選んだコンビや回答からは、笑いに対する感性や、日常での人との関わり方が見えてきます。

「正統派漫才」を好むあなたは、物事の筋道を大切にし、オーソドックスな価値観を持つタイプかもしれません。
「シュール系」や「独特の世界観」を好むあなたは、人と違う視点を持ち、新しいものを受け入れる柔軟性があります。
「しゃべくり漫才」を好むあなたは、人との会話やコミュニケーションを楽しむ社交的なタイプ。

好きな審査員からも面白い傾向が見えます。松本人志派は「独創性」重視、上沼恵美子派は「情熱」重視、立川志らく派は「技術」重視といった具合です。

年末の風物詩となったM-1。笑いの好みは十人十色ですが、「面白い」と感じる瞬間こそがあなた自身を映し出しています。`
        }
    }
];
