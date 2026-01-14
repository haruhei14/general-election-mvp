-- 学校ジャンル 30問のお題を一括登録するSQL
INSERT INTO polls (id, title, genre, options) VALUES
-- 授業・勉強系
('poll-school-001', '授業中に眠くなったら、どう対処する？', '学校', '[{"id":"opt-1","label":"頑張って起きてる","votes":0},{"id":"opt-2","label":"ちょっとだけ寝る","votes":0},{"id":"opt-3","label":"トイレに行く","votes":0},{"id":"opt-4","label":"顔を洗いに行く","votes":0},{"id":"opt-5","label":"ガムや飴で凌ぐ","votes":0}]'),
('poll-school-002', 'テスト前の勉強、いつから本気出す？', '学校', '[{"id":"opt-1","label":"2週間以上前から","votes":0},{"id":"opt-2","label":"1週間前から","votes":0},{"id":"opt-3","label":"3日前からガチモード","votes":0},{"id":"opt-4","label":"前日に徹夜","votes":0},{"id":"opt-5","label":"当日の朝","votes":0}]'),
('poll-school-003', 'ぶっちゃけ学校で一番好きな時間は？', '学校', '[{"id":"opt-1","label":"休み時間","votes":0},{"id":"opt-2","label":"給食・昼食","votes":0},{"id":"opt-3","label":"放課後","votes":0},{"id":"opt-4","label":"体育","votes":0},{"id":"opt-5","label":"下校時間","votes":0}]'),
('poll-school-004', '席替えで一番嬉しい席はどこ？', '学校', '[{"id":"opt-1","label":"窓側の一番後ろ","votes":0},{"id":"opt-2","label":"友達の隣","votes":0},{"id":"opt-3","label":"後ろの方ならどこでも","votes":0},{"id":"opt-4","label":"前の方で集中できる席","votes":0},{"id":"opt-5","label":"廊下側で逃げやすい席","votes":0}]'),
('poll-school-005', '教科書を忘れた時、どうする？', '学校', '[{"id":"opt-1","label":"隣の人に見せてもらう","votes":0},{"id":"opt-2","label":"先生に正直に言う","votes":0},{"id":"opt-3","label":"ロッカーにあるフリをする","votes":0},{"id":"opt-4","label":"友達に借りに行く","votes":0},{"id":"opt-5","label":"黙って座ってる","votes":0}]'),

-- 友達・人間関係系
('poll-school-006', '友達とのLINEグループ、通知はどうしてる？', '学校', '[{"id":"opt-1","label":"常にON","votes":0},{"id":"opt-2","label":"通知オフ","votes":0},{"id":"opt-3","label":"グループによる","votes":0},{"id":"opt-4","label":"既読スルー多め","votes":0}]'),
('poll-school-007', '仲良いグループ、何人くらいがベスト？', '学校', '[{"id":"opt-1","label":"2〜3人の少人数","votes":0},{"id":"opt-2","label":"4〜5人くらい","votes":0},{"id":"opt-3","label":"6人以上の大所帯","votes":0},{"id":"opt-4","label":"一人がいい","votes":0}]'),
('poll-school-008', 'クラスで自分のポジション、どれが近い？', '学校', '[{"id":"opt-1","label":"盛り上げ役・ムードメーカー","votes":0},{"id":"opt-2","label":"聞き役・相談役","votes":0},{"id":"opt-3","label":"ツッコミ・まとめ役","votes":0},{"id":"opt-4","label":"マイペースに単独行動","votes":0},{"id":"opt-5","label":"特に決まってない","votes":0}]'),
('poll-school-009', '苦手な人がいる班になったら、どうする？', '学校', '[{"id":"opt-1","label":"最低限の会話で乗り切る","votes":0},{"id":"opt-2","label":"意外と話してみる","votes":0},{"id":"opt-3","label":"友達に助けを求める","votes":0},{"id":"opt-4","label":"先生に相談する","votes":0}]'),
('poll-school-010', '休み時間、基本何してる？', '学校', '[{"id":"opt-1","label":"友達とおしゃべり","votes":0},{"id":"opt-2","label":"スマホいじり","votes":0},{"id":"opt-3","label":"次の授業の準備","votes":0},{"id":"opt-4","label":"トイレ・移動","votes":0},{"id":"opt-5","label":"寝る","votes":0}]'),

-- 部活・放課後系
('poll-school-011', '部活と勉強、正直どっちを優先してきた？', '学校', '[{"id":"opt-1","label":"圧倒的に部活","votes":0},{"id":"opt-2","label":"どちらかと言えば部活","votes":0},{"id":"opt-3","label":"どちらかと言えば勉強","votes":0},{"id":"opt-4","label":"圧倒的に勉強","votes":0},{"id":"opt-5","label":"どっちも手抜きだった","votes":0}]'),
('poll-school-012', '学校から帰ったら、まず何する？', '学校', '[{"id":"opt-1","label":"スマホチェック","votes":0},{"id":"opt-2","label":"おやつ・ご飯","votes":0},{"id":"opt-3","label":"とりあえず寝る","votes":0},{"id":"opt-4","label":"宿題・勉強","votes":0},{"id":"opt-5","label":"ゲーム・YouTube","votes":0}]'),
('poll-school-013', '帰宅部って正直どう思う？', '学校', '[{"id":"opt-1","label":"全然アリ","votes":0},{"id":"opt-2","label":"自分もそうだった","votes":0},{"id":"opt-3","label":"もったいないとは思う","votes":0},{"id":"opt-4","label":"部活は絶対やるべき","votes":0}]'),
('poll-school-014', '文化祭と体育祭、どっちが好き？', '学校', '[{"id":"opt-1","label":"断然文化祭","votes":0},{"id":"opt-2","label":"断然体育祭","votes":0},{"id":"opt-3","label":"どっちも好き","votes":0},{"id":"opt-4","label":"どっちも苦手","votes":0}]'),

-- 給食・昼食系
('poll-school-015', '給食のおかわり、積極的にしてた？', '学校', '[{"id":"opt-1","label":"毎回おかわり勢","votes":0},{"id":"opt-2","label":"好きなものだけ","votes":0},{"id":"opt-3","label":"控えめにしてた","votes":0},{"id":"opt-4","label":"残すことも多かった","votes":0}]'),
('poll-school-016', '給食で一番テンション上がったメニューは？', '学校', '[{"id":"opt-1","label":"揚げパン","votes":0},{"id":"opt-2","label":"カレーライス","votes":0},{"id":"opt-3","label":"ソフト麺","votes":0},{"id":"opt-4","label":"フルーツポンチ","votes":0},{"id":"opt-5","label":"唐揚げ","votes":0}]'),
('poll-school-017', 'お弁当派？学食派？購買派？', '学校', '[{"id":"opt-1","label":"手作りお弁当派","votes":0},{"id":"opt-2","label":"学食派","votes":0},{"id":"opt-3","label":"購買パン派","votes":0},{"id":"opt-4","label":"コンビニで買う派","votes":0}]'),

-- 先生・授業系
('poll-school-018', '好きな先生のタイプはどれ？', '学校', '[{"id":"opt-1","label":"面白くて授業が楽しい","votes":0},{"id":"opt-2","label":"優しくて怒らない","votes":0},{"id":"opt-3","label":"厳しいけど分かりやすい","votes":0},{"id":"opt-4","label":"話を聞いてくれる","votes":0}]'),
('poll-school-019', '一番好きだった教科は？', '学校', '[{"id":"opt-1","label":"英語","votes":0},{"id":"opt-2","label":"数学","votes":0},{"id":"opt-3","label":"国語","votes":0},{"id":"opt-4","label":"理科","votes":0},{"id":"opt-5","label":"社会","votes":0},{"id":"opt-6","label":"体育","votes":0},{"id":"opt-7","label":"美術・音楽","votes":0}]'),
('poll-school-020', '当てられたくない時の行動、どれが近い？', '学校', '[{"id":"opt-1","label":"目を合わせない","votes":0},{"id":"opt-2","label":"下を向いてメモを取るフリ","votes":0},{"id":"opt-3","label":"わざと忙しそうにする","votes":0},{"id":"opt-4","label":"堂々と当てられる覚悟","votes":0}]'),

-- あるある系
('poll-school-021', 'チャイムが鳴る直前の「あと1分…」の感覚、共感できる？', '学校', '[{"id":"opt-1","label":"めっちゃ分かる","votes":0},{"id":"opt-2","label":"まあ分かる","votes":0},{"id":"opt-3","label":"そこまで気にしない","votes":0},{"id":"opt-4","label":"逆に授業好きだった","votes":0}]'),
('poll-school-022', '黒板消しクリーナーの音、好き？嫌い？', '学校', '[{"id":"opt-1","label":"なんか好き","votes":0},{"id":"opt-2","label":"特に何も感じない","votes":0},{"id":"opt-3","label":"うるさくて嫌い","votes":0},{"id":"opt-4","label":"懐かしい","votes":0}]'),
('poll-school-023', '体育のマラソン、どうやって乗り切った？', '学校', '[{"id":"opt-1","label":"本気で走って上位狙い","votes":0},{"id":"opt-2","label":"友達と話しながらゆっくり","votes":0},{"id":"opt-3","label":"サボれるところはサボった","votes":0},{"id":"opt-4","label":"仮病を使ったことがある","votes":0}]'),
('poll-school-024', '教室移動の時の荷物、どうしてた？', '学校', '[{"id":"opt-1","label":"必要なものだけ持つ","votes":0},{"id":"opt-2","label":"カバンごと持ち歩く","votes":0},{"id":"opt-3","label":"友達に預ける","votes":0},{"id":"opt-4","label":"なるべく教室から出ない","votes":0}]'),

-- 懐かしい系
('poll-school-025', '学校で流行ったもの、何が思い浮かぶ？', '学校', '[{"id":"opt-1","label":"消しゴム落とし","votes":0},{"id":"opt-2","label":"ペン回し","votes":0},{"id":"opt-3","label":"トランプ・UNO","votes":0},{"id":"opt-4","label":"たまごっち等のゲーム","votes":0},{"id":"opt-5","label":"手紙交換","votes":0}]'),
('poll-school-026', '掃除の時間、真面目にやってた？', '学校', '[{"id":"opt-1","label":"真面目にやってた","votes":0},{"id":"opt-2","label":"適当にやってた","votes":0},{"id":"opt-3","label":"サボってた","votes":0},{"id":"opt-4","label":"掃除場所による","votes":0}]'),
('poll-school-027', '学校のプール、好きだった？苦手だった？', '学校', '[{"id":"opt-1","label":"大好きだった","votes":0},{"id":"opt-2","label":"まあ好きだった","votes":0},{"id":"opt-3","label":"ちょっと苦手だった","votes":0},{"id":"opt-4","label":"大嫌いだった","votes":0}]'),
('poll-school-028', '修学旅行の夜、どこまで起きてた？', '学校', '[{"id":"opt-1","label":"朝まで完徹","votes":0},{"id":"opt-2","label":"2〜3時くらいまで","votes":0},{"id":"opt-3","label":"消灯後すぐ寝た","votes":0},{"id":"opt-4","label":"先生に怒られて強制就寝","votes":0}]'),
('poll-school-029', '卒業式、泣いた？泣かなかった？', '学校', '[{"id":"opt-1","label":"号泣した","votes":0},{"id":"opt-2","label":"ちょっと泣いた","votes":0},{"id":"opt-3","label":"泣かなかった","votes":0},{"id":"opt-4","label":"もらい泣きした","votes":0}]'),
('poll-school-030', '学校生活、総合的にどうだった？', '学校', '[{"id":"opt-1","label":"最高だった！","votes":0},{"id":"opt-2","label":"楽しかった","votes":0},{"id":"opt-3","label":"普通だった","votes":0},{"id":"opt-4","label":"あまり良くなかった","votes":0},{"id":"opt-5","label":"戻りたくない","votes":0}]')
;
