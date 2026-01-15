-- back number まるごと総選挙データ挿入
-- Supabase SQL Editorで実行してください

-- Q1: 最も好きなback numberの曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q1', '最も好きなback numberの曲は？', '音楽', '数々の名曲の中から、あなたのNo.1を選んでください。', 'marugoto', '{"summary": "back numberの楽曲はどれも心に響くものばかり。選んだ曲には、あなたの恋愛観や大切な思い出が反映されているかもしれません。"}', '[{"id":"1","label":"高嶺の花子さん","votes":0},{"id":"2","label":"クリスマスソング","votes":0},{"id":"3","label":"水平線","votes":0},{"id":"4","label":"ハッピーエンド","votes":0},{"id":"5","label":"花束","votes":0},{"id":"6","label":"SISTER","votes":0},{"id":"7","label":"瞬き","votes":0},{"id":"8","label":"手紙","votes":0},{"id":"9","label":"大不正解","votes":0},{"id":"10","label":"わたがし","votes":0},{"id":"11","label":"fish","votes":0},{"id":"12","label":"ヒロイン","votes":0},{"id":"13","label":"幸せ","votes":0},{"id":"14","label":"西藤公園","votes":0},{"id":"15","label":"君がドアを閉めた後","votes":0},{"id":"16","label":"黄色","votes":0},{"id":"17","label":"怪盗","votes":0},{"id":"18","label":"秘密のキス","votes":0},{"id":"19","label":"エンディング","votes":0},{"id":"20","label":"ARTIST","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q2: 一番泣ける曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q2', '一番泣ける曲は？', '音楽', '聴くたびに涙が溢れる、あの曲。', 'marugoto', '{"summary": "泣ける曲を選ぶことで、あなたがどんな場面で心を動かされるかが見えてきます。"}', '[{"id":"1","label":"花束","votes":0},{"id":"2","label":"クリスマスソング","votes":0},{"id":"3","label":"水平線","votes":0},{"id":"4","label":"ハッピーエンド","votes":0},{"id":"5","label":"fish","votes":0},{"id":"6","label":"手紙","votes":0},{"id":"7","label":"ヒロイン","votes":0},{"id":"8","label":"幸せ","votes":0},{"id":"9","label":"瞬き","votes":0},{"id":"10","label":"君がドアを閉めた後","votes":0},{"id":"11","label":"電車の窓から","votes":0},{"id":"12","label":"助演女優症","votes":0},{"id":"13","label":"泡と羊","votes":0},{"id":"14","label":"西藤公園","votes":0},{"id":"15","label":"オールドファッション","votes":0},{"id":"16","label":"わたがし","votes":0},{"id":"17","label":"003","votes":0},{"id":"18","label":"この瞬間を生きている","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q3: カラオケで歌いたい曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q3', 'カラオケで歌いたい曲は？', '音楽', '盛り上がる曲から切ない曲まで、あなたのレパートリーは？', 'marugoto', '{"summary": "カラオケで選ぶ曲は、あなたが人前でどう見られたいかを反映しています。"}', '[{"id":"1","label":"高嶺の花子さん","votes":0},{"id":"2","label":"わたがし","votes":0},{"id":"3","label":"大不正解","votes":0},{"id":"4","label":"SISTER","votes":0},{"id":"5","label":"瞬き","votes":0},{"id":"6","label":"ハッピーエンド","votes":0},{"id":"7","label":"クリスマスソング","votes":0},{"id":"8","label":"ヒロイン","votes":0},{"id":"9","label":"花束","votes":0},{"id":"10","label":"手紙","votes":0},{"id":"11","label":"003","votes":0},{"id":"12","label":"黄色","votes":0},{"id":"13","label":"ARTIST","votes":0},{"id":"14","label":"怪盗","votes":0},{"id":"15","label":"ネタンデルタール人","votes":0},{"id":"16","label":"ミラーボールとシンデレラ","votes":0},{"id":"17","label":"スーパースターになったら","votes":0},{"id":"18","label":"MOTTO","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q4: 失恋したときに聴きたい曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q4', '失恋したときに聴きたい曲は？', '音楽', '傷ついた心に寄り添ってくれる1曲。', 'marugoto', '{"summary": "失恋時に聴く曲は、癒しを求めるか、悲しみに浸りたいか、前を向きたいか——あなたの失恋への向き合い方が分かります。"}', '[{"id":"1","label":"花束","votes":0},{"id":"2","label":"fish","votes":0},{"id":"3","label":"ハッピーエンド","votes":0},{"id":"4","label":"クリスマスソング","votes":0},{"id":"5","label":"手紙","votes":0},{"id":"6","label":"幸せ","votes":0},{"id":"7","label":"君がドアを閉めた後","votes":0},{"id":"8","label":"ヒロイン","votes":0},{"id":"9","label":"電車の窓から","votes":0},{"id":"10","label":"助演女優症","votes":0},{"id":"11","label":"助演女優症2","votes":0},{"id":"12","label":"泡と羊","votes":0},{"id":"13","label":"世田谷ラブストーリー","votes":0},{"id":"14","label":"オールドファッション","votes":0},{"id":"15","label":"笑顔","votes":0},{"id":"16","label":"そのドレスちょっと待った","votes":0},{"id":"17","label":"003","votes":0},{"id":"18","label":"僕は君の事が好きだけど君は僕を別に好きじゃないみたい","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q5: ベストアルバムを選ぶなら？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q5', 'ベストアルバムを選ぶなら？', '音楽', '思い入れのあるアルバムは？', 'marugoto', '{"summary": "アルバム選びは、あなたがback numberと出会った時期や、一番聴き込んだ時期を反映しているかもしれません。"}', '[{"id":"1","label":"アンコール","votes":0},{"id":"2","label":"blues","votes":0},{"id":"3","label":"MAGIC","votes":0},{"id":"4","label":"ラブストーリー","votes":0},{"id":"5","label":"yellow","votes":0},{"id":"6","label":"SISTER","votes":0},{"id":"7","label":"人間","votes":0},{"id":"8","label":"スーパースター","votes":0},{"id":"9","label":"逃した魚","votes":0},{"id":"10","label":"superstar","votes":0},{"id":"11","label":"目を閉じてなくても","votes":0},{"id":"12","label":"コボタントル","votes":0},{"id":"13","label":"シャンデリア","votes":0},{"id":"14","label":"LADY","votes":0},{"id":"15","label":"ハッピーエンド(アルバム)","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q6: 告白のときに贈りたい曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q6', '告白のときに贈りたい曲は？', '音楽', '想いを伝えるあの瞬間に添えたい1曲。', 'marugoto', '{"summary": "告白に選ぶ曲は、あなたがどんな愛の形を理想としているかを物語っています。"}', '[{"id":"1","label":"花束","votes":0},{"id":"2","label":"高嶺の花子さん","votes":0},{"id":"3","label":"君の恋人になったら","votes":0},{"id":"4","label":"瞬き","votes":0},{"id":"5","label":"手紙","votes":0},{"id":"6","label":"幸せ","votes":0},{"id":"7","label":"西藤公園","votes":0},{"id":"8","label":"ヒロイン","votes":0},{"id":"9","label":"クリスマスソング","votes":0},{"id":"10","label":"わたがし","votes":0},{"id":"11","label":"繋いだ手から","votes":0},{"id":"12","label":"MOTTO","votes":0},{"id":"13","label":"恋","votes":0},{"id":"14","label":"秘密のキス","votes":0},{"id":"15","label":"エンディング","votes":0},{"id":"16","label":"オールドファッション","votes":0},{"id":"17","label":"日曜日","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q7: ドライブ中に聴きたい曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q7', 'ドライブ中に聴きたい曲は？', '音楽', '車窓を眺めながら流したい1曲。', 'marugoto', '{"summary": "ドライブのお供に選ぶ曲は、あなたの理想のドライブシーンを映し出しています。"}', '[{"id":"1","label":"SISTER","votes":0},{"id":"2","label":"大不正解","votes":0},{"id":"3","label":"わたがし","votes":0},{"id":"4","label":"高嶺の花子さん","votes":0},{"id":"5","label":"助演女優症2","votes":0},{"id":"6","label":"スーパースターになったら","votes":0},{"id":"7","label":"003","votes":0},{"id":"8","label":"黄色","votes":0},{"id":"9","label":"ARTIST","votes":0},{"id":"10","label":"ネタンデルタール人","votes":0},{"id":"11","label":"ミラーボールとシンデレラ","votes":0},{"id":"12","label":"MOTTO","votes":0},{"id":"13","label":"怪盗","votes":0},{"id":"14","label":"思い出せない","votes":0},{"id":"15","label":"SUPER MAGIC","votes":0},{"id":"16","label":"HY(ハッピー)","votes":0},{"id":"17","label":"逃した魚","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q8: 歌詞が一番刺さる曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q8', '歌詞が一番刺さる曲は？', '音楽', '心の奥まで響く言葉を持つ曲。', 'marugoto', '{"summary": "刺さる歌詞を選ぶことで、あなたが今抱えている感情や、過去に経験した出来事が垣間見えます。"}', '[{"id":"1","label":"水平線","votes":0},{"id":"2","label":"花束","votes":0},{"id":"3","label":"ハッピーエンド","votes":0},{"id":"4","label":"高嶺の花子さん","votes":0},{"id":"5","label":"fish","votes":0},{"id":"6","label":"手紙","votes":0},{"id":"7","label":"瞬き","votes":0},{"id":"8","label":"クリスマスソング","votes":0},{"id":"9","label":"幸せ","votes":0},{"id":"10","label":"ヒロイン","votes":0},{"id":"11","label":"助演女優症","votes":0},{"id":"12","label":"電車の窓から","votes":0},{"id":"13","label":"君がドアを閉めた後","votes":0},{"id":"14","label":"003","votes":0},{"id":"15","label":"オールドファッション","votes":0},{"id":"16","label":"この瞬間を生きている","votes":0},{"id":"17","label":"西藤公園","votes":0},{"id":"18","label":"わたがし","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q9: 一番好きなタイアップ曲は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q9', '一番好きなタイアップ曲は？', '音楽', 'ドラマ・映画・アニメを彩った名曲たち。', 'marugoto', '{"summary": "タイアップ曲は作品と曲が一体となって記憶に残ります。あなたの好きなタイアップから、思い出の作品が見えてきます。"}', '[{"id":"1","label":"瞬き（8年越しの花嫁）","votes":0},{"id":"2","label":"ハッピーエンド（ぼく明日）","votes":0},{"id":"3","label":"水平線（インターハイ2020）","votes":0},{"id":"4","label":"大不正解（銀魂）","votes":0},{"id":"5","label":"クリスマスソング（5→9）","votes":0},{"id":"6","label":"SISTER（同名ドラマ）","votes":0},{"id":"7","label":"花束（初めて恋をした日に読む話）","votes":0},{"id":"8","label":"ヒロイン（ヒロイン失格）","votes":0},{"id":"9","label":"手紙（orange）","votes":0},{"id":"10","label":"黄色（推しの子）","votes":0},{"id":"11","label":"怪盗（SUITS2）","votes":0},{"id":"12","label":"秘密のキス（映画）","votes":0},{"id":"13","label":"オールドファッション（大恋愛）","votes":0},{"id":"14","label":"幸せ（ナラタージュ）","votes":0},{"id":"15","label":"ARTIST（レンアイ漫画家）","votes":0}]')
ON CONFLICT (id) DO NOTHING;

-- Q10: back numberの魅力は？
INSERT INTO polls (id, title, genre, description, poll_type, explanation, options) VALUES
('marugoto_backnumber_q10', 'back numberの魅力は？', '音楽', 'あなたがback numberを好きな理由は？', 'marugoto', '{"summary": "何に惹かれるかで、あなたが音楽に求めるものが見えてきます。声なのか、言葉なのか、それとも人柄なのか。"}', '[{"id":"1","label":"清水依与吏の声","votes":0},{"id":"2","label":"共感できる歌詞","votes":0},{"id":"3","label":"切ないメロディ","votes":0},{"id":"4","label":"ライブパフォーマンス","votes":0},{"id":"5","label":"MVの世界観","votes":0},{"id":"6","label":"楽曲の幅広さ","votes":0},{"id":"7","label":"変わらないスタイル","votes":0},{"id":"8","label":"仲の良いメンバー","votes":0},{"id":"9","label":"恋愛観","votes":0},{"id":"10","label":"日常を歌う等身大さ","votes":0},{"id":"11","label":"バンドサウンドの良さ","votes":0}]')
ON CONFLICT (id) DO NOTHING;
