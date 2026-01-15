-- お題リクエスト用テーブル作成
-- Supabase SQL Editorで実行してください

CREATE TABLE IF NOT EXISTS theme_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_text TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'marugoto', -- リクエスト元（将来の拡張用）
    status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, implemented
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_theme_requests_created_at ON theme_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_theme_requests_status ON theme_requests(status);

-- RLS (Row Level Security) ポリシー
ALTER TABLE theme_requests ENABLE ROW LEVEL SECURITY;

-- 誰でも挿入可能（匿名ユーザーでもOK）
CREATE POLICY "Anyone can insert theme requests" ON theme_requests
    FOR INSERT WITH CHECK (true);

-- 読み取りはサービスロールのみ（管理者用）
CREATE POLICY "Service role can read theme requests" ON theme_requests
    FOR SELECT USING (auth.role() = 'service_role');

-- 更新・削除もサービスロールのみ
CREATE POLICY "Service role can update theme requests" ON theme_requests
    FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "Service role can delete theme requests" ON theme_requests
    FOR DELETE USING (auth.role() = 'service_role');
