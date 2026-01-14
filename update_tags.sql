-- 既存のお題にタグを付与するSQL

-- 学校ジャンル（poll-school-xxx）
UPDATE polls SET tags = ARRAY['学校', '学生', 'あるある'] WHERE genre = '学校';
UPDATE polls SET tags = tags || ARRAY['勉強', '授業'] WHERE id IN ('poll-school-001', 'poll-school-002', 'poll-school-003', 'poll-school-004', 'poll-school-005', 'poll-school-011', 'poll-school-018', 'poll-school-019', 'poll-school-020');
UPDATE polls SET tags = tags || ARRAY['給食', 'お昼'] WHERE id IN ('poll-school-015', 'poll-school-016', 'poll-school-017');
UPDATE polls SET tags = tags || ARRAY['青春', '懐かしい'] WHERE id IN ('poll-school-025', 'poll-school-026', 'poll-school-027', 'poll-school-028', 'poll-school-029', 'poll-school-030');
UPDATE polls SET tags = tags || ARRAY['友達', '人間関係'] WHERE id IN ('poll-school-006', 'poll-school-007', 'poll-school-008', 'poll-school-009', 'poll-school-010', 'poll-school-021');

-- 日常・生活
UPDATE polls SET tags = ARRAY['日常', '生活', 'ルーティン'] WHERE genre = '日常・生活';
UPDATE polls SET tags = tags || ARRAY['朝', '習慣'] WHERE id = 'poll-001'; -- 朝起き
UPDATE polls SET tags = tags || ARRAY['家', 'くつろぎ'] WHERE id IN ('poll-002', 'poll-004', 'poll-006');
UPDATE polls SET tags = tags || ARRAY['お風呂', 'リラックス'] WHERE id = 'poll-003';
UPDATE polls SET tags = tags || ARRAY['睡眠', '健康'] WHERE id = 'poll-005';
UPDATE polls SET tags = tags || ARRAY['掃除', '清潔'] WHERE id IN ('poll-009', 'poll-008', 'poll-011');
UPDATE polls SET tags = tags || ARRAY['買い物', 'コンビニ'] WHERE id = 'poll-012';

-- 食べ物
UPDATE polls SET tags = ARRAY['食べ物', 'グルメ', '飯テロ'] WHERE genre = '食べ物';
UPDATE polls SET tags = tags || ARRAY['ラーメン', '麺類'] WHERE id IN ('poll-015', 'poll-023');
UPDATE polls SET tags = tags || ARRAY['こだわり', '論争'] WHERE id IN ('poll-014', 'poll-016', 'poll-021', 'poll-022', 'poll-025'); -- 目玉焼き、唐揚げレモン、納豆、餃子タレ、TKG
UPDATE polls SET tags = tags || ARRAY['焼肉', '肉'] WHERE id = 'poll-018';
UPDATE polls SET tags = tags || ARRAY['寿司', '和食'] WHERE id = 'poll-019';
UPDATE polls SET tags = tags || ARRAY['お菓子', '甘党'] WHERE id = 'poll-026';

-- 価値観
UPDATE polls SET tags = ARRAY['価値観', '人生', '性格'] WHERE genre = '価値観' OR genre = '日常・価値観';
UPDATE polls SET tags = tags || ARRAY['お金', '仕事'] WHERE id IN ('poll-029', 'poll-030', 'poll-031');
UPDATE polls SET tags = tags || ARRAY['恋愛', '結婚'] WHERE id IN ('poll-028', 'poll-081', 'poll-089', 'poll-086', 'poll-087');

-- エンタメ
UPDATE polls SET tags = ARRAY['エンタメ', '趣味', '娯楽'] WHERE genre = 'エンタメ' OR genre = '趣味・娯楽';
UPDATE polls SET tags = tags || ARRAY['音楽', 'ライブ'] WHERE id IN ('poll-040', 'poll-044', 'poll-047');
UPDATE polls SET tags = tags || ARRAY['映画', '動画'] WHERE id IN ('poll-041', 'poll-042', 'poll-048', 'poll-050');
UPDATE polls SET tags = tags || ARRAY['アニメ', 'マンガ'] WHERE id IN ('poll-046', 'poll-049');
UPDATE polls SET tags = tags || ARRAY['ゲーム'] WHERE id = 'poll-045';

-- 仕事・学び
UPDATE polls SET tags = ARRAY['仕事', '社会人', 'キャリア'] WHERE genre = '仕事・学び' OR genre = '仕事・社会人';
UPDATE polls SET tags = tags || ARRAY['上司', '人間関係'] WHERE id IN ('poll-054', 'poll-058', 'poll-064');
UPDATE polls SET tags = tags || ARRAY['効率化', 'スキル'] WHERE id IN ('poll-056', 'poll-057', 'poll-061');

-- テクノロジー
UPDATE polls SET tags = ARRAY['テクノロジー', 'ガジェット', 'スマホ'] WHERE genre = 'テクノロジー';
UPDATE polls SET tags = tags || ARRAY['iPhone/Android', 'OS'] WHERE id = 'poll-065';
UPDATE polls SET tags = tags || ARRAY['SNS'] WHERE id IN ('poll-068', 'poll-083');
UPDATE polls SET tags = tags || ARRAY['AI', '未来'] WHERE id IN ('poll-066', 'poll-072');

-- 人間関係
UPDATE polls SET tags = ARRAY['人間関係', 'コミュニケーション', '友達'] WHERE genre = '人間関係';
UPDATE polls SET tags = tags || ARRAY['悩み', 'ストレス'] WHERE id IN ('poll-080', 'poll-083', 'poll-085');
UPDATE polls SET tags = tags || ARRAY['恋愛'] WHERE id IN ('poll-086', 'poll-087');

-- 究極の選択
UPDATE polls SET tags = ARRAY['究極の選択', 'もしも'] WHERE genre = '究極の選択';
UPDATE polls SET tags = tags || ARRAY['タイムトラベル'] WHERE id = 'poll-089';
UPDATE polls SET tags = tags || ARRAY['サバイバル'] WHERE id IN ('poll-095', 'poll-097');
UPDATE polls SET tags = tags || ARRAY['超能力'] WHERE id IN ('poll-091', 'poll-093');
