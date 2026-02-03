-- Force schema cache reload by making a dummy change
NOTIFY pgrst, 'reload config';
