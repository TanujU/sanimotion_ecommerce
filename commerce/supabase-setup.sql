-- Supabase Database Setup for Sanimotion E-commerce
-- Comprehensive security setup following Supabase best practices
-- Run this script in your Supabase SQL editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create user profiles table (public schema) - extends auth.users
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100),
    phone_number TEXT CHECK (phone_number IS NULL OR length(phone_number) <= 20),
    avatar_url TEXT CHECK (avatar_url IS NULL OR length(avatar_url) <= 500),
    bio TEXT CHECK (bio IS NULL OR length(bio) <= 1000),
    is_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table with enhanced security
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    refresh_expires_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    device_info JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier TEXT NOT NULL, -- IP address or user ID
    action TEXT NOT NULL, -- login, signup, password_reset, etc.
    attempts INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(identifier, action, window_start)
);

-- Create promo_codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    issued_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    initial_amount NUMERIC(10,2) NOT NULL,
    remaining_amount NUMERIC(10,2) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance and security
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON public.user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(id) WHERE is_verified = true;
CREATE INDEX IF NOT EXISTS idx_user_profiles_locked ON public.user_profiles(locked_until) WHERE locked_until IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON public.sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON public.sessions(is_active, expires_at) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_sessions_ip ON public.sessions(ip_address, created_at);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_ip ON public.audit_logs(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON public.rate_limits(identifier, action, expires_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON public.rate_limits(expires_at);

CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_issued_to ON public.promo_codes(issued_to);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to log audit events
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Get the user ID from the record
    target_user_id := COALESCE(NEW.id, OLD.id);
    
    -- Only log if the user exists in auth.users or if it's a system operation
    IF target_user_id IS NOT NULL AND (
        EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) OR
        TG_TABLE_NAME IN ('rate_limits', 'audit_logs')
    ) THEN
        INSERT INTO public.audit_logs (
            user_id,
            action,
            resource_type,
            resource_id,
            metadata
        ) VALUES (
            target_user_id,
            TG_OP,
            TG_TABLE_NAME,
            target_user_id,
            jsonb_build_object(
                'old_data', CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
                'new_data', CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
            )
        );
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_identifier TEXT,
    p_action TEXT,
    p_max_attempts INTEGER,
    p_window_minutes INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    current_attempts INTEGER;
    window_start TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Calculate window start time
    window_start := NOW() - (p_window_minutes || ' minutes')::INTERVAL;
    
    -- Get current attempts in the window
    SELECT COALESCE(SUM(attempts), 0)
    INTO current_attempts
    FROM public.rate_limits
    WHERE identifier = p_identifier
      AND action = p_action
      AND window_start >= window_start;
    
    -- Check if limit exceeded
    IF current_attempts >= p_max_attempts THEN
        RETURN FALSE;
    END IF;
    
    -- Record this attempt
    INSERT INTO public.rate_limits (identifier, action, attempts, expires_at)
    VALUES (p_identifier, p_action, 1, NOW() + (p_window_minutes || ' minutes')::INTERVAL)
    ON CONFLICT (identifier, action, window_start)
    DO UPDATE SET attempts = rate_limits.attempts + 1;
    
    RETURN TRUE;
END;
$$ language 'plpgsql';

-- Create function to clean up expired data
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
    -- Clean up expired sessions
    DELETE FROM public.sessions WHERE expires_at < NOW();
    
    -- Clean up expired rate limits
    DELETE FROM public.rate_limits WHERE expires_at < NOW();
    
    -- Clean up old audit logs (keep for 1 year)
    DELETE FROM public.audit_logs WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ language 'plpgsql';

-- Create function to handle failed login attempts
CREATE OR REPLACE FUNCTION handle_failed_login(p_user_id UUID)
RETURNS void AS $$
DECLARE
    failed_attempts INTEGER;
    lock_until TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Increment failed login attempts
    UPDATE public.user_profiles
    SET failed_login_attempts = failed_login_attempts + 1,
        updated_at = NOW()
    WHERE id = p_user_id
    RETURNING failed_login_attempts INTO failed_attempts;
    
    -- Lock account after 5 failed attempts for 30 minutes
    IF failed_attempts >= 5 THEN
        lock_until := NOW() + INTERVAL '30 minutes';
        UPDATE public.user_profiles
        SET locked_until = lock_until,
            updated_at = NOW()
        WHERE id = p_user_id;
    END IF;
END;
$$ language 'plpgsql';

-- Create function to reset failed login attempts on successful login
CREATE OR REPLACE FUNCTION handle_successful_login(p_user_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.user_profiles
    SET failed_login_attempts = 0,
        locked_until = NULL,
        last_login_at = NOW(),
        login_count = login_count + 1,
        updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ language 'plpgsql';

-- Create triggers for automatic updates and audit logging
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON public.user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER audit_user_profiles_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_sessions_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.sessions
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_promo_codes_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.promo_codes
    FOR EACH ROW
    EXECUTE FUNCTION log_audit_event();

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for user_profiles table
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert for authenticated users" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users cannot delete their own profile" ON public.user_profiles
    FOR DELETE USING (false); -- Prevent profile deletion

-- Create comprehensive RLS policies for sessions table
CREATE POLICY "Users can view their own sessions" ON public.sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON public.sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON public.sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" ON public.sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Create comprehensive RLS policies for promo_codes table
CREATE POLICY "Users can view their own promo codes" ON public.promo_codes
    FOR SELECT USING (auth.uid() = issued_to OR issued_to IS NULL);

CREATE POLICY "Allow insert for service role" ON public.promo_codes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for service role" ON public.promo_codes
    FOR UPDATE USING (true);

-- Create RLS policies for audit_logs table (admin only)
CREATE POLICY "Admin can view all audit logs" ON public.audit_logs
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "System can insert audit logs" ON public.audit_logs
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for rate_limits table (system only)
CREATE POLICY "System can manage rate limits" ON public.rate_limits
    FOR ALL USING (auth.role() = 'service_role');

-- Create scheduled cleanup job (requires pg_cron extension)
-- Note: This requires the pg_cron extension to be enabled in Supabase
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup job to run every hour
-- SELECT cron.schedule('cleanup-expired-data', '0 * * * *', 'SELECT cleanup_expired_data();');

-- Note: Guest users will be handled at the order level, not as user profiles
-- When a guest places an order, their info will be stored directly in the order table

-- Grant necessary permissions with security restrictions
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on user_profiles
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- Grant permissions on sessions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;

-- Grant permissions on promo_codes
GRANT SELECT ON public.promo_codes TO anon, authenticated;

-- Grant permissions on audit_logs (admin only)
GRANT SELECT ON public.audit_logs TO service_role;

-- Grant permissions on rate_limits (system only)
GRANT ALL ON public.rate_limits TO service_role;

-- Grant execute permissions on security functions
GRANT EXECUTE ON FUNCTION cleanup_expired_data() TO service_role;
GRANT EXECUTE ON FUNCTION check_rate_limit(TEXT, TEXT, INTEGER, INTEGER) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION handle_failed_login(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION handle_successful_login(UUID) TO service_role;

-- Insert some sample promo codes
INSERT INTO public.promo_codes (code, initial_amount, remaining_amount) VALUES
('WELCOME50', 50.00, 50.00),
('FIRST10', 10.00, 10.00),
('MEDICAL20', 20.00, 20.00)
ON CONFLICT (code) DO NOTHING;
