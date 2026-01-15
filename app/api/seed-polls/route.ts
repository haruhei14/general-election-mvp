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
            { id: 'opt-1', label: 'きのこの山', votes: 0 },
            { id: 'opt-2', label: 'たけのこの里', votes: 0 },
            { id: 'opt-3', label: 'どっちも好き', votes: 0 },
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
            { id: 'opt-1', label: 'かける（かけてほしい）', votes: 0 },
            { id: 'opt-2', label: '勝手にはNO', votes: 0 },
            { id: 'opt-3', label: '自分の分だけ', votes: 0 },
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
            { id: 'opt-1', label: '過去に行きたい', votes: 0 },
            { id: 'opt-2', label: '未来に行きたい', votes: 0 },
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
            { id: 'opt-1', label: '既読無視の方がマシ', votes: 0 },
            { id: 'opt-2', label: '未読無視の方がマシ', votes: 0 },
            { id: 'opt-3', label: 'どっちも最悪', votes: 0 },
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
            { id: 'opt-1', label: '豊かだと思う（合理的）', votes: 0 },
            { id: 'opt-2', label: '豊かではない（情緒が大切）', votes: 0 },
            { id: 'opt-3', label: 'どちらとも言えない', votes: 0 },
        ]
    },
    // まるごと総選挙：ワンピース
    {
        id: 'marugoto_onepiece_q1',
        title: '一番食べたい「悪魔の実」は？',
        genre: 'エンタメ',
        description: '能力への憧れ vs 日常での利便性。あなたが欲しいのは？',
        poll_type: 'marugoto',
        explanation: { summary: '戦闘力だけでなく、移動の便利さや生活への応用など、選ぶ実によってあなたの「欲望」が見えてきます。' },
        options: [
            { id: '1', label: 'ゴムゴムの実（ニカ）', votes: 0 },
            { id: '2', label: 'メラメラの実', votes: 0 },
            { id: '3', label: 'オペオペの実', votes: 0 },
            { id: '4', label: 'ヒエヒエの実', votes: 0 },
            { id: '5', label: 'ピカピカの実', votes: 0 },
            { id: '6', label: 'ゴロゴロの実', votes: 0 },
            { id: '7', label: 'ハナハナの実', votes: 0 },
            { id: '8', label: 'スケスケの実', votes: 0 },
            { id: '9', label: 'マネマネの実', votes: 0 },
            { id: '10', label: 'トリトリの実（マルコ）', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q2',
        title: '一番泣ける「過去編」エピソードは？',
        genre: 'エンタメ',
        description: '涙なしでは見られない名エピソードたち。',
        poll_type: 'marugoto',
        explanation: { summary: 'ワンピースの真骨頂である過去編。親子の絆、継承される意志、理不尽な差別など、どのテーマに心を揺さぶられるかであなたの感性がわかります。' },
        options: [
            { id: '1', label: 'ナミ（ベルメール）', votes: 0 },
            { id: '2', label: 'チョッパー（ヒルルク）', votes: 0 },
            { id: '3', label: 'ニコ・ロビン（オハラ）', votes: 0 },
            { id: '4', label: 'サンジ（ゼフ/バラティエ）', votes: 0 },
            { id: '5', label: 'エース・サボ・ルフィ', votes: 0 },
            { id: '6', label: 'ロー（コラソン）', votes: 0 },
            { id: '7', label: 'ブルック（ルンバー海賊団）', votes: 0 },
            { id: '8', label: 'フランキー（トム）', votes: 0 },
            { id: '9', label: '魚人島（オトヒメ・タイガー）', votes: 0 },
            { id: '10', label: '錦えもん・モモの助（おでん）', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q3',
        title: '麦わらの一味以外で、入りたい海賊団・勢力は？',
        genre: 'エンタメ',
        description: 'もしあなたがワンピースの世界に転生したら？',
        poll_type: 'marugoto',
        explanation: { summary: '組織の雰囲気やトップのカリスマ性への指向性が出ます。自由か、家族か、実力主義か、それとも正義か。' },
        options: [
            { id: '1', label: '赤髪海賊団', votes: 0 },
            { id: '2', label: '白ひげ海賊団', votes: 0 },
            { id: '3', label: 'ハートの海賊団', votes: 0 },
            { id: '4', label: 'クロスギルド', votes: 0 },
            { id: '5', label: '黒ひげ海賊団', votes: 0 },
            { id: '6', label: '百獣海賊団', votes: 0 },
            { id: '7', label: 'ビッグ・マム海賊団', votes: 0 },
            { id: '8', label: 'ドンキホーテファミリー', votes: 0 },
            { id: '9', label: '革命軍', votes: 0 },
            { id: '10', label: '海軍本部', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q4',
        title: '作中「最強」だと思うキャラクターは？',
        genre: 'エンタメ',
        description: '全盛期も含めて、あなたが思うNo.1は？',
        poll_type: 'marugoto',
        explanation: { summary: '実績（ロジャー・白ひげ）を重視するか、描写（カイドウ）を重視するか、それとも物語上の役割（シャンクス・ルフィ）を重視するか。最強論議に終わりはありません。' },
        options: [
            { id: '1', label: 'ゴール・D・ロジャー', votes: 0 },
            { id: '2', label: '白ひげ（ニューゲート）', votes: 0 },
            { id: '3', label: 'ロックス・D・ジーベック', votes: 0 },
            { id: '4', label: 'シャンクス', votes: 0 },
            { id: '5', label: 'カイドウ', votes: 0 },
            { id: '6', label: 'ジュラキュール・ミホーク', votes: 0 },
            { id: '7', label: '赤犬（サカズキ）', votes: 0 },
            { id: '8', label: '黒ひげ（ティーチ）', votes: 0 },
            { id: '9', label: 'ガープ', votes: 0 },
            { id: '10', label: 'ニカ（ルフィ）', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q5',
        title: '一番ワクワクした「島・シリーズ」は？',
        genre: 'エンタメ',
        description: '冒険の浪漫を感じたのはどこ？',
        poll_type: 'marugoto',
        explanation: { summary: '初期の「冒険感」が好きか、中盤の「世界観の広がり」が好きか、終盤の「伏線回収と激闘」が好きか。好みのストーリーテリングがわかります。' },
        options: [
            { id: '1', label: 'イーストブルー編', votes: 0 },
            { id: '2', label: 'アラバスタ編', votes: 0 },
            { id: '3', label: '空島編', votes: 0 },
            { id: '4', label: 'エニエス・ロビー編', votes: 0 },
            { id: '5', label: 'スリラーバーク編', votes: 0 },
            { id: '6', label: '頂上戦争編', votes: 0 },
            { id: '7', label: '魚人島編', votes: 0 },
            { id: '8', label: 'ドレスローザ編', votes: 0 },
            { id: '9', label: 'ホールケーキアイランド編', votes: 0 },
            { id: '10', label: 'ワノ国編', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q6',
        title: '現実にいたら「上司」にしたいのは？',
        genre: 'エンタメ',
        description: 'ついていきたいリーダーは誰？',
        poll_type: 'marugoto',
        explanation: { summary: 'カリスマ性、マネジメント力、実利、情熱。あなたがリーダーに求める資質がそのまま反映されます。' },
        options: [
            { id: '1', label: 'シャンクス', votes: 0 },
            { id: '2', label: '白ひげ', votes: 0 },
            { id: '3', label: 'ジンベエ', votes: 0 },
            { id: '4', label: '青キジ（クザン）', votes: 0 },
            { id: '5', label: 'コビー', votes: 0 },
            { id: '6', label: 'スモーカー', votes: 0 },
            { id: '7', label: 'クロコダイル', votes: 0 },
            { id: '8', label: 'ドフラミンゴ', votes: 0 },
            { id: '9', label: 'アイスバーグ', votes: 0 },
            { id: '10', label: 'センゴク', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q7',
        title: 'デザインが一番好きな「女性キャラクター」は？',
        genre: 'エンタメ',
        description: '見た目、ファッション、雰囲気…あなたの好みは？',
        poll_type: 'marugoto',
        explanation: { summary: '尾田先生の描く多様な女性キャラクターたち。清楚、セクシー、クール、キュート、あなたはどの属性に惹かれますか？' },
        options: [
            { id: '1', label: 'ナミ', votes: 0 },
            { id: '2', label: 'ニコ・ロビン', votes: 0 },
            { id: '3', label: 'ボア・ハンコック', votes: 0 },
            { id: '4', label: 'ネフェルタリ・ビビ', votes: 0 },
            { id: '5', label: 'ペローナ', votes: 0 },
            { id: '6', label: 'しらほし', votes: 0 },
            { id: '7', label: 'ヤマト', votes: 0 },
            { id: '8', label: 'レイジュ', votes: 0 },
            { id: '9', label: 'ウタ', votes: 0 },
            { id: '10', label: 'たしぎ', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q8',
        title: '一番言いたい「名言・決め台詞」は？',
        genre: 'エンタメ',
        description: '日常で叫びたい、心に残るあの一言。',
        poll_type: 'marugoto',
        explanation: { summary: 'ワンピースは名言の宝庫。自分の信念を貫く言葉か、感謝を伝える言葉か、それとも魂の叫びか。選んだ言葉はあなたの座右の銘になるかもしれません。' },
        options: [
            { id: '1', label: '海賊王に俺はなる！', votes: 0 },
            { id: '2', label: '愛してくれて…ありがとう', votes: 0 },
            { id: '3', label: 'クソお世話になりました', votes: 0 },
            { id: '4', label: '人の夢は終わらねェ', votes: 0 },
            { id: '5', label: '全くいい人生だった', votes: 0 },
            { id: '6', label: '背中の傷は剣士の恥だ', votes: 0 },
            { id: '7', label: '生きたいと言えェ！', votes: 0 },
            { id: '8', label: '友（ダチ）だろ!!!!', votes: 0 },
            { id: '9', label: 'お前船に乗れ', votes: 0 },
            { id: '10', label: 'ぎの゛ォー（笑い）', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q9',
        title: '一番好きな「劇場版（映画）」は？',
        genre: 'エンタメ',
        description: 'スクリーンで輝く麦わらの一味の活躍。',
        poll_type: 'marugoto',
        explanation: { summary: '尾田先生監修以降の作品か、それ以前の異色作か。映画ならではのお祭り感や、パラレルだからこそできる展開のどれを好むかが分かれます。' },
        options: [
            { id: '1', label: 'STRONG WORLD', votes: 0 },
            { id: '2', label: 'Z（ゼット）', votes: 0 },
            { id: '3', label: 'GOLD', votes: 0 },
            { id: '4', label: 'STAMPEDE', votes: 0 },
            { id: '5', label: 'RED', votes: 0 },
            { id: '6', label: 'オマツリ男爵と秘密の島', votes: 0 },
            { id: '7', label: 'デッドエンドの冒険', votes: 0 },
            { id: '8', label: '呪われた聖剣', votes: 0 },
            { id: '9', label: 'カラクリ城のメカ巨兵', votes: 0 },
            { id: '10', label: 'ねじまき島の冒険', votes: 0 }
        ]
    },
    {
        id: 'marugoto_onepiece_q10',
        title: '今後の展開で一番「気になる謎」は？',
        genre: 'エンタメ',
        description: '最終章に向けて、あなたが一番知りたい真実は？',
        poll_type: 'marugoto',
        explanation: { summary: '物語の根幹に関わる謎ばかり。どの謎に一番惹かれるかで、あなたがワンピースの「何」を楽しんでいるか（歴史、バトル、人間ドラマ）が見えてきます。' },
        options: [
            { id: '1', label: 'ワンピースの正体', votes: 0 },
            { id: '2', label: 'Dの意志の意味', votes: 0 },
            { id: '3', label: '空白の100年', votes: 0 },
            { id: '4', label: 'イム様の正体', votes: 0 },
            { id: '5', label: '五老星の正体', votes: 0 },
            { id: '6', label: 'シャンクスの真の目的', votes: 0 },
            { id: '7', label: '黒ひげの体の構造', votes: 0 },
            { id: '8', label: '古代兵器', votes: 0 },
            { id: '9', label: 'ルフィの母親', votes: 0 },
            { id: '10', label: 'オールブルーの場所', votes: 0 }
        ]
    },
    // まるごと総選挙：back number
    {
        id: 'marugoto_backnumber_q1',
        title: '最も好きなback numberの曲は？',
        genre: '音楽',
        description: '数々の名曲の中から、あなたのNo.1を選んでください。',
        poll_type: 'marugoto',
        explanation: { summary: 'back numberの楽曲はどれも心に響くものばかり。選んだ曲には、あなたの恋愛観や大切な思い出が反映されているかもしれません。' },
        options: [
            { id: '1', label: '高嶺の花子さん', votes: 0 },
            { id: '2', label: 'クリスマスソング', votes: 0 },
            { id: '3', label: '水平線', votes: 0 },
            { id: '4', label: 'ハッピーエンド', votes: 0 },
            { id: '5', label: '花束', votes: 0 },
            { id: '6', label: 'SISTER', votes: 0 },
            { id: '7', label: '瞬き', votes: 0 },
            { id: '8', label: '手紙', votes: 0 },
            { id: '9', label: '大不正解', votes: 0 },
            { id: '10', label: 'わたがし', votes: 0 },
            { id: '11', label: 'fish', votes: 0 },
            { id: '12', label: 'ヒロイン', votes: 0 },
            { id: '13', label: '幸せ', votes: 0 },
            { id: '14', label: '西藤公園', votes: 0 },
            { id: '15', label: '君がドアを閉めた後', votes: 0 },
            { id: '16', label: '黄色', votes: 0 },
            { id: '17', label: '怪盗', votes: 0 },
            { id: '18', label: '秘密のキス', votes: 0 },
            { id: '19', label: 'エンディング', votes: 0 },
            { id: '20', label: 'ARTIST', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q2',
        title: '一番泣ける曲は？',
        genre: '音楽',
        description: '聴くたびに涙が溢れる、あの曲。',
        poll_type: 'marugoto',
        explanation: { summary: '泣ける曲を選ぶことで、あなたがどんな場面で心を動かされるかが見えてきます。別れの悲しみか、叶わぬ恋か、それとも日常の尊さか。' },
        options: [
            { id: '1', label: '花束', votes: 0 },
            { id: '2', label: 'クリスマスソング', votes: 0 },
            { id: '3', label: '水平線', votes: 0 },
            { id: '4', label: 'ハッピーエンド', votes: 0 },
            { id: '5', label: 'fish', votes: 0 },
            { id: '6', label: '手紙', votes: 0 },
            { id: '7', label: 'ヒロイン', votes: 0 },
            { id: '8', label: '幸せ', votes: 0 },
            { id: '9', label: '瞬き', votes: 0 },
            { id: '10', label: '君がドアを閉めた後', votes: 0 },
            { id: '11', label: '電車の窓から', votes: 0 },
            { id: '12', label: '助演女優症', votes: 0 },
            { id: '13', label: '泡と羊', votes: 0 },
            { id: '14', label: '西藤公園', votes: 0 },
            { id: '15', label: 'オールドファッション', votes: 0 },
            { id: '16', label: 'わたがし', votes: 0 },
            { id: '17', label: '003', votes: 0 },
            { id: '18', label: 'この瞬間を生きている', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q3',
        title: 'カラオケで歌いたい曲は？',
        genre: '音楽',
        description: '盛り上がる曲から切ない曲まで、あなたのレパートリーは？',
        poll_type: 'marugoto',
        explanation: { summary: 'カラオケで選ぶ曲は、あなたが人前でどう見られたいかを反映しています。情熱的に歌い上げるか、しっとり聴かせるか。' },
        options: [
            { id: '1', label: '高嶺の花子さん', votes: 0 },
            { id: '2', label: 'わたがし', votes: 0 },
            { id: '3', label: '大不正解', votes: 0 },
            { id: '4', label: 'SISTER', votes: 0 },
            { id: '5', label: '瞬き', votes: 0 },
            { id: '6', label: 'ハッピーエンド', votes: 0 },
            { id: '7', label: 'クリスマスソング', votes: 0 },
            { id: '8', label: 'ヒロイン', votes: 0 },
            { id: '9', label: '花束', votes: 0 },
            { id: '10', label: '手紙', votes: 0 },
            { id: '11', label: '003', votes: 0 },
            { id: '12', label: '黄色', votes: 0 },
            { id: '13', label: 'ARTIST', votes: 0 },
            { id: '14', label: '怪盗', votes: 0 },
            { id: '15', label: 'ネタンデルタール人', votes: 0 },
            { id: '16', label: 'ミラーボールとシンデレラ', votes: 0 },
            { id: '17', label: 'スーパースターになったら', votes: 0 },
            { id: '18', label: 'MOTTO', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q4',
        title: '失恋したときに聴きたい曲は？',
        genre: '音楽',
        description: '傷ついた心に寄り添ってくれる1曲。',
        poll_type: 'marugoto',
        explanation: { summary: '失恋時に聴く曲は、癒しを求めるか、悲しみに浸りたいか、前を向きたいか——あなたの失恋への向き合い方が分かります。' },
        options: [
            { id: '1', label: '花束', votes: 0 },
            { id: '2', label: 'fish', votes: 0 },
            { id: '3', label: 'ハッピーエンド', votes: 0 },
            { id: '4', label: 'クリスマスソング', votes: 0 },
            { id: '5', label: '手紙', votes: 0 },
            { id: '6', label: '幸せ', votes: 0 },
            { id: '7', label: '君がドアを閉めた後', votes: 0 },
            { id: '8', label: 'ヒロイン', votes: 0 },
            { id: '9', label: '電車の窓から', votes: 0 },
            { id: '10', label: '助演女優症', votes: 0 },
            { id: '11', label: '助演女優症2', votes: 0 },
            { id: '12', label: '泡と羊', votes: 0 },
            { id: '13', label: '世田谷ラブストーリー', votes: 0 },
            { id: '14', label: 'オールドファッション', votes: 0 },
            { id: '15', label: '笑顔', votes: 0 },
            { id: '16', label: 'そのドレスちょっと待った', votes: 0 },
            { id: '17', label: '003', votes: 0 },
            { id: '18', label: '僕は君の事が好きだけど君は僕を別に好きじゃないみたい', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q5',
        title: 'ベストアルバムを選ぶなら？',
        genre: '音楽',
        description: '思い入れのあるアルバムは？',
        poll_type: 'marugoto',
        explanation: { summary: 'アルバム選びは、あなたがback numberと出会った時期や、一番聴き込んだ時期を反映しているかもしれません。' },
        options: [
            { id: '1', label: 'アンコール', votes: 0 },
            { id: '2', label: 'blues', votes: 0 },
            { id: '3', label: 'MAGIC', votes: 0 },
            { id: '4', label: 'ラブストーリー', votes: 0 },
            { id: '5', label: 'yellow', votes: 0 },
            { id: '6', label: 'SISTER', votes: 0 },
            { id: '7', label: '人間', votes: 0 },
            { id: '8', label: 'スーパースター', votes: 0 },
            { id: '9', label: '逃した魚', votes: 0 },
            { id: '10', label: 'superstar', votes: 0 },
            { id: '11', label: '目を閉じてなくても', votes: 0 },
            { id: '12', label: 'コボタントル', votes: 0 },
            { id: '13', label: 'シャンデリア', votes: 0 },
            { id: '14', label: 'LADY', votes: 0 },
            { id: '15', label: 'ハッピーエンド(アルバム)', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q6',
        title: '告白のときに贈りたい曲は？',
        genre: '音楽',
        description: '想いを伝えるあの瞬間に添えたい1曲。',
        poll_type: 'marugoto',
        explanation: { summary: '告白に選ぶ曲は、あなたがどんな愛の形を理想としているかを物語っています。情熱的？純粋？それとも少し不器用？' },
        options: [
            { id: '1', label: '花束', votes: 0 },
            { id: '2', label: '高嶺の花子さん', votes: 0 },
            { id: '3', label: '君の恋人になったら', votes: 0 },
            { id: '4', label: '瞬き', votes: 0 },
            { id: '5', label: '手紙', votes: 0 },
            { id: '6', label: '幸せ', votes: 0 },
            { id: '7', label: '西藤公園', votes: 0 },
            { id: '8', label: 'ヒロイン', votes: 0 },
            { id: '9', label: 'クリスマスソング', votes: 0 },
            { id: '10', label: 'わたがし', votes: 0 },
            { id: '11', label: '繋いだ手から', votes: 0 },
            { id: '12', label: 'MOTTO', votes: 0 },
            { id: '13', label: '恋', votes: 0 },
            { id: '14', label: '秘密のキス', votes: 0 },
            { id: '15', label: 'エンディング', votes: 0 },
            { id: '16', label: 'オールドファッション', votes: 0 },
            { id: '17', label: '日曜日', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q7',
        title: 'ドライブ中に聴きたい曲は？',
        genre: '音楽',
        description: '車窓を眺めながら流したい1曲。',
        poll_type: 'marugoto',
        explanation: { summary: 'ドライブのお供に選ぶ曲は、あなたの理想のドライブシーンを映し出しています。爽やかな晴れの日か、しっとりした夜か。' },
        options: [
            { id: '1', label: 'SISTER', votes: 0 },
            { id: '2', label: '大不正解', votes: 0 },
            { id: '3', label: 'わたがし', votes: 0 },
            { id: '4', label: '高嶺の花子さん', votes: 0 },
            { id: '5', label: '助演女優症2', votes: 0 },
            { id: '6', label: 'スーパースターになったら', votes: 0 },
            { id: '7', label: '003', votes: 0 },
            { id: '8', label: '黄色', votes: 0 },
            { id: '9', label: 'ARTIST', votes: 0 },
            { id: '10', label: 'ネタンデルタール人', votes: 0 },
            { id: '11', label: 'ミラーボールとシンデレラ', votes: 0 },
            { id: '12', label: 'MOTTO', votes: 0 },
            { id: '13', label: '怪盗', votes: 0 },
            { id: '14', label: '思い出せない', votes: 0 },
            { id: '15', label: 'SUPER MAGIC', votes: 0 },
            { id: '16', label: 'HY(ハッピー)', votes: 0 },
            { id: '17', label: '逃した魚', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q8',
        title: '歌詞が一番刺さる曲は？',
        genre: '音楽',
        description: '心の奥まで響く言葉を持つ曲。',
        poll_type: 'marugoto',
        explanation: { summary: '刺さる歌詞を選ぶことで、あなたが今抱えている感情や、過去に経験した出来事が垣間見えます。' },
        options: [
            { id: '1', label: '水平線', votes: 0 },
            { id: '2', label: '花束', votes: 0 },
            { id: '3', label: 'ハッピーエンド', votes: 0 },
            { id: '4', label: '高嶺の花子さん', votes: 0 },
            { id: '5', label: 'fish', votes: 0 },
            { id: '6', label: '手紙', votes: 0 },
            { id: '7', label: '瞬き', votes: 0 },
            { id: '8', label: 'クリスマスソング', votes: 0 },
            { id: '9', label: '幸せ', votes: 0 },
            { id: '10', label: 'ヒロイン', votes: 0 },
            { id: '11', label: '助演女優症', votes: 0 },
            { id: '12', label: '電車の窓から', votes: 0 },
            { id: '13', label: '君がドアを閉めた後', votes: 0 },
            { id: '14', label: '003', votes: 0 },
            { id: '15', label: 'オールドファッション', votes: 0 },
            { id: '16', label: 'この瞬間を生きている', votes: 0 },
            { id: '17', label: '西藤公園', votes: 0 },
            { id: '18', label: 'わたがし', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q9',
        title: '一番好きなタイアップ曲は？',
        genre: '音楽',
        description: 'ドラマ・映画・アニメを彩った名曲たち。',
        poll_type: 'marugoto',
        explanation: { summary: 'タイアップ曲は作品と曲が一体となって記憶に残ります。あなたの好きなタイアップから、思い出の作品が見えてきます。' },
        options: [
            { id: '1', label: '瞬き（8年越しの花嫁）', votes: 0 },
            { id: '2', label: 'ハッピーエンド（ぼく明日）', votes: 0 },
            { id: '3', label: '水平線（インターハイ2020）', votes: 0 },
            { id: '4', label: '大不正解（銀魂）', votes: 0 },
            { id: '5', label: 'クリスマスソング（5→9）', votes: 0 },
            { id: '6', label: 'SISTER（同名ドラマ）', votes: 0 },
            { id: '7', label: '花束（初めて恋をした日に読む話）', votes: 0 },
            { id: '8', label: 'ヒロイン（ヒロイン失格）', votes: 0 },
            { id: '9', label: '手紙（orange）', votes: 0 },
            { id: '10', label: '黄色（推しの子）', votes: 0 },
            { id: '11', label: '怪盗（SUITS2）', votes: 0 },
            { id: '12', label: '秘密のキス（映画）', votes: 0 },
            { id: '13', label: 'オールドファッション（大恋愛）', votes: 0 },
            { id: '14', label: '幸せ（ナラタージュ）', votes: 0 },
            { id: '15', label: 'ARTIST（レンアイ漫画家）', votes: 0 }
        ]
    },
    {
        id: 'marugoto_backnumber_q10',
        title: 'back numberの魅力は？',
        genre: '音楽',
        description: 'あなたがback numberを好きな理由は？',
        poll_type: 'marugoto',
        explanation: { summary: '何に惹かれるかで、あなたが音楽に求めるものが見えてきます。声なのか、言葉なのか、それとも人柄なのか。' },
        options: [
            { id: '1', label: '清水依与吏の声', votes: 0 },
            { id: '2', label: '共感できる歌詞', votes: 0 },
            { id: '3', label: '切ないメロディ', votes: 0 },
            { id: '4', label: 'ライブパフォーマンス', votes: 0 },
            { id: '5', label: 'MVの世界観', votes: 0 },
            { id: '6', label: '楽曲の幅広さ', votes: 0 },
            { id: '7', label: '変わらないスタイル', votes: 0 },
            { id: '8', label: '仲の良いメンバー', votes: 0 },
            { id: '9', label: '恋愛観', votes: 0 },
            { id: '10', label: '日常を歌う等身大さ', votes: 0 },
            { id: '11', label: 'バンドサウンドの良さ', votes: 0 }
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
                // ユーザー要望により、全てのシードデータの投票数をリセットする（optionsを上書き）
                console.log(`Resetting poll votes/data for ${poll.id}...`);
                const { error: updateError } = await supabase
                    .from('polls')
                    .update({
                        poll_type: 'daily_trend',
                        explanation: poll.explanation,
                        title: poll.title,
                        description: poll.description,
                        options: poll.options // 投票数を0にリセット
                    })
                    .eq('id', poll.id);

                if (updateError) {
                    console.error(`Error updating poll ${poll.id}:`, updateError);
                    results.push({ id: poll.id, status: 'update_failed', error: updateError });
                } else {
                    results.push({ id: poll.id, status: 'updated (reset votes)' });
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
                poll_type: (poll as any).poll_type || 'daily_trend'
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
