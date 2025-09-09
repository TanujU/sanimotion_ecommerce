-- Drop All Tables Script for Sanimotion E-commerce
-- WARNING: This will permanently delete all data and tables
-- Run this script in your Supabase SQL editor

-- Drop all tables first (this will automatically drop triggers and policies)
DO $$ 
BEGIN
    DROP TABLE IF EXISTS public.rate_limits CASCADE;
    DROP TABLE IF EXISTS public.audit_logs CASCADE;
    DROP TABLE IF EXISTS public.sessions CASCADE;
    DROP TABLE IF EXISTS public.promo_codes CASCADE;
    DROP TABLE IF EXISTS public.user_profiles CASCADE;
EXCEPTION
    WHEN undefined_table THEN
        -- Tables don't exist, continue
        NULL;
END $$;

-- Drop all functions (with CASCADE to handle any remaining dependencies)
DO $$ 
BEGIN
    DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
    DROP FUNCTION IF EXISTS log_audit_event() CASCADE;
    DROP FUNCTION IF EXISTS check_rate_limit(TEXT, TEXT, INTEGER, INTEGER) CASCADE;
    DROP FUNCTION IF EXISTS cleanup_expired_data() CASCADE;
    DROP FUNCTION IF EXISTS handle_failed_login(UUID) CASCADE;
    DROP FUNCTION IF EXISTS handle_successful_login(UUID) CASCADE;
EXCEPTION
    WHEN undefined_function THEN
        -- Functions don't exist, continue
        NULL;
END $$;

-- Drop extensions (optional - only if you want to remove them completely)
-- DROP EXTENSION IF EXISTS "pgcrypto";
-- DROP EXTENSION IF EXISTS "pg_stat_statements";
-- DROP EXTENSION IF EXISTS "uuid-ossp";

-- Note: We don't drop auth.users as it's managed by Supabase Auth
-- Note: We don't drop the extensions as they might be used by other parts of Supabase
