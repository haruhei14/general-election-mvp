-- poll_typeが正しく設定されていない（または再投入したい）お題を削除
delete from polls where id = 'taipa-performance';
delete from polls where id = 'read-ignore-v2';
