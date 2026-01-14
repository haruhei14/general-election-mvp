
export type MarugotoTheme = {
    id: string; // e.g. 'onepiece'
    title: string;
    description: string;
    icon: string; // emoji or lucide icon name (handled in component)
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
        color: 'from-blue-500 to-cyan-400', // 海のイメージ
        isNew: true,
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
    }
];
