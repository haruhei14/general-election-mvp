-- 学校ジャンル 30問のお題に解説を追加するSQL
-- Google Search Console対策: コンテンツを充実させてインデックス登録を改善

-- 授業・勉強系
UPDATE polls SET 
    description = '誰もが経験する授業中の眠気との戦い。あなたの対処法は？',
    explanation = '{"summary": "午後の授業や退屈な科目で襲ってくる睡魔。頑張って起きる派と戦略的に対処する派に分かれます。あなたはどっち派だった？"}'::jsonb
WHERE id = 'poll-school-001';

UPDATE polls SET 
    description = 'テスト前の本気モード、いつスイッチ入る？',
    explanation = '{"summary": "計画的に勉強する優等生から、一夜漬け職人まで。テスト前の過ごし方は人それぞれ。あなたのスタイルが見えてきます。"}'::jsonb
WHERE id = 'poll-school-002';

UPDATE polls SET 
    description = '学校で一番楽しみだった時間は？',
    explanation = '{"summary": "授業より休み時間が楽しみだったのは誰しも同じ？給食派、放課後派など意見が分かれるところ。懐かしい学校生活を振り返ろう。"}'::jsonb
WHERE id = 'poll-school-003';

UPDATE polls SET 
    description = '席替えは学校生活の一大イベント。理想の席はどこ？',
    explanation = '{"summary": "窓際後方は不動の人気席。友達の隣になれるかどうかで一喜一憂した経験、誰にでもありますよね。"}'::jsonb
WHERE id = 'poll-school-004';

UPDATE polls SET 
    description = '教科書を忘れた時の対処法、あなたはどうしてた？',
    explanation = '{"summary": "隣の人に見せてもらうのが王道？正直に申告する勇者もいれば、なんとか誤魔化そうとする人も。学校あるあるです。"}'::jsonb
WHERE id = 'poll-school-005';

-- 友達・人間関係系
UPDATE polls SET 
    description = 'クラスLINEの通知設定、どうしてる？',
    explanation = '{"summary": "常時ONで即レス派もいれば、通知オフで自分のペースを守る派も。SNS時代の学生のリアルな付き合い方が見えます。"}'::jsonb
WHERE id = 'poll-school-006';

UPDATE polls SET 
    description = '仲良しグループ、何人くらいが心地いい？',
    explanation = '{"summary": "少人数でじっくり派から大人数でワイワイ派まで。理想のグループサイズは性格が表れます。"}'::jsonb
WHERE id = 'poll-school-007';

UPDATE polls SET 
    description = 'クラス内での自分のポジション、どれに近い？',
    explanation = '{"summary": "ムードメーカー、聞き役、マイペース派…学校での自分の立ち位置を振り返ると、今の自分との共通点が見えてくるかも。"}'::jsonb
WHERE id = 'poll-school-008';

UPDATE polls SET 
    description = '班決めで苦手な人と一緒になった時、どう乗り切る？',
    explanation = '{"summary": "学校生活で避けられない人間関係のストレス。最低限で乗り切る派と意外と話してみる派、あなたはどっち？"}'::jsonb
WHERE id = 'poll-school-009';

UPDATE polls SET 
    description = '休み時間の過ごし方、何がデフォルト？',
    explanation = '{"summary": "友達との雑談、スマホタイム、次の授業の準備…貴重な10分をどう使うかに個性が出ます。"}'::jsonb
WHERE id = 'poll-school-010';

-- 部活・放課後系
UPDATE polls SET 
    description = '部活と勉強の両立、実際どうだった？',
    explanation = '{"summary": "文武両道を目指す人もいれば、どちらか一方に全振りの人も。青春時代の優先順位が見えてきます。"}'::jsonb
WHERE id = 'poll-school-011';

UPDATE polls SET 
    description = '帰宅後のルーティン、最初に何する？',
    explanation = '{"summary": "まずスマホをチェックするか、おやつを食べるか、宿題を片付けるか。帰宅後の行動パターンは人それぞれ。"}'::jsonb
WHERE id = 'poll-school-012';

UPDATE polls SET 
    description = '帰宅部という選択、あなたはどう思う？',
    explanation = '{"summary": "部活に入らない選択。自由時間を確保できる反面、青春の思い出が減る？様々な意見があります。"}'::jsonb
WHERE id = 'poll-school-013';

UPDATE polls SET 
    description = '学校の二大イベント、あなたはどっち派？',
    explanation = '{"summary": "クラスで出し物を作る文化祭と、運動で競い合う体育祭。どっちにテンションが上がるかで体育会系か文化系かがわかる？"}'::jsonb
WHERE id = 'poll-school-014';

-- 給食・昼食系
UPDATE polls SET 
    description = '給食のおかわり、積極的に行ってた？',
    explanation = '{"summary": "おかわりジャンケンの常連だった人もいれば、控えめに食べていた人も。給食タイムの立ち回りを振り返ろう。"}'::jsonb
WHERE id = 'poll-school-015';

UPDATE polls SET 
    description = '給食メニューで一番テンション上がったのは？',
    explanation = '{"summary": "揚げパン、カレー、ソフト麺…世代や地域で人気メニューは異なります。あなたの思い出の給食は？"}'::jsonb
WHERE id = 'poll-school-016';

UPDATE polls SET 
    description = '中学・高校のお昼ご飯事情、あなたはどのタイプ？',
    explanation = '{"summary": "お弁当を毎日作ってもらった人、学食でガッツリ派、購買でパンを買う派…お昼スタイルは家庭環境や学校によって様々。"}'::jsonb
WHERE id = 'poll-school-017';

-- 先生・授業系
UPDATE polls SET 
    description = '好きな先生のタイプ、どれが一番当てはまる？',
    explanation = '{"summary": "面白い授業をしてくれる先生、優しい先生、厳しいけど頼れる先生…好きな先生のタイプで自分の価値観がわかります。"}'::jsonb
WHERE id = 'poll-school-018';

UPDATE polls SET 
    description = '学校で一番好きだった教科は？',
    explanation = '{"summary": "得意科目と好きな科目は違う？英語、数学、体育…みんなの人気教科を投票で決めよう。"}'::jsonb
WHERE id = 'poll-school-019';

UPDATE polls SET 
    description = '当てられたくない時の行動、どれに共感する？',
    explanation = '{"summary": "目を合わせない、下を向く、忙しいフリをする…先生に当てられたくない時の防御術、あなたはどれだった？"}'::jsonb
WHERE id = 'poll-school-020';

-- あるある系
UPDATE polls SET 
    description = '授業終了直前の「あと1分」の感覚、共感できる？',
    explanation = '{"summary": "チャイムが鳴る直前の時計とのにらめっこ。時間が過ぎるのが遅く感じるあの感覚、誰もが経験したはず。"}'::jsonb
WHERE id = 'poll-school-021';

UPDATE polls SET 
    description = '黒板消しクリーナーの「ウィーン」という音、どう思う？',
    explanation = '{"summary": "懐かしいと感じる人、うるさいと思っていた人…学校の日常音にも意外と思い入れがあるものです。"}'::jsonb
WHERE id = 'poll-school-022';

UPDATE polls SET 
    description = '体育のマラソン大会、どうやって乗り切った？',
    explanation = '{"summary": "本気で走るアスリート派から、友達と話しながらゆっくり派まで。マラソンへの向き合い方は人それぞれ。"}'::jsonb
WHERE id = 'poll-school-023';

UPDATE polls SET 
    description = '移動教室の時の荷物管理、どうしてた？',
    explanation = '{"summary": "必要最低限で身軽に行く派とカバンごと持ち歩く派。盗難が心配な時代の学校あるあるです。"}'::jsonb
WHERE id = 'poll-school-024';

-- 懐かしい系
UPDATE polls SET 
    description = '学校で流行った遊び、何を思い出す？',
    explanation = '{"summary": "消しゴム落とし、ペン回し、トランプ…世代によって流行は違えど、休み時間の思い出は誰にでもあるはず。"}'::jsonb
WHERE id = 'poll-school-025';

UPDATE polls SET 
    description = '掃除の時間、真面目にやってた？正直に答えて！',
    explanation = '{"summary": "掃除をサボった経験、誰にでもあるのでは？真面目派とサボり派、掃除場所によるという現実派など意見は様々。"}'::jsonb
WHERE id = 'poll-school-026';

UPDATE polls SET 
    description = '学校のプール授業、好きだった？苦手だった？',
    explanation = '{"summary": "夏の楽しみだった人もいれば、着替えが面倒、泳げないから苦手だった人も。プールの思い出を振り返ろう。"}'::jsonb
WHERE id = 'poll-school-027';

UPDATE polls SET 
    description = '修学旅行の夜、どこまで起きてた？',
    explanation = '{"summary": "修学旅行の夜は特別。消灯後も友達と喋り続けた思い出、先生に怒られた思い出…青春の1ページです。"}'::jsonb
WHERE id = 'poll-school-028';

UPDATE polls SET 
    description = '卒業式で泣いた？泣かなかった？',
    explanation = '{"summary": "号泣した人、泣くまいと堪えた人、全く泣かなかった人…卒業式の感動は人それぞれ。もらい泣きした人も多いはず。"}'::jsonb
WHERE id = 'poll-school-029';

UPDATE polls SET 
    description = '学校生活を総合評価すると、どうだった？',
    explanation = '{"summary": "最高の青春だった人から、あまり良い思い出がない人まで。学校生活の総合評価、みんなの声を聞いてみよう。"}'::jsonb
WHERE id = 'poll-school-030';
