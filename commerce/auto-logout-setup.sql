-- Auto Logout and Session Management Setup
-- Run this script in your Supabase SQL editor

-- Update the existing cleanup function to be more comprehensive
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    -- Delete expired sessions from our custom sessions table
    DELETE FROM public.sessions WHERE expires_at < NOW();
    
    -- Also clean up any orphaned sessions (where user no longer exists)
    DELETE FROM public.sessions 
    WHERE user_id NOT IN (SELECT id FROM auth.users);
    
    -- Log the cleanup activity
    RAISE NOTICE 'Cleaned up expired sessions at %', NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a more comprehensive session cleanup function
CREATE OR REPLACE FUNCTION cleanup_all_expired_sessions()
RETURNS TABLE(cleaned_sessions integer, cleaned_auth_sessions integer) AS $$
DECLARE
    custom_sessions_count integer;
    auth_sessions_count integer;
BEGIN
    -- Clean up our custom sessions table
    DELETE FROM public.sessions WHERE expires_at < NOW();
    GET DIAGNOSTICS custom_sessions_count = ROW_COUNT;
    
    -- Note: We can't directly clean auth.sessions as it's managed by Supabase
    -- But we can clean up our tracking table
    auth_sessions_count := 0;
    
    RETURN QUERY SELECT custom_sessions_count, auth_sessions_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get session statistics
CREATE OR REPLACE FUNCTION get_session_stats()
RETURNS TABLE(
    total_sessions integer,
    active_sessions integer,
    expired_sessions integer,
    oldest_session timestamp with time zone,
    newest_session timestamp with time zone
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::integer as total_sessions,
        COUNT(*) FILTER (WHERE expires_at > NOW())::integer as active_sessions,
        COUNT(*) FILTER (WHERE expires_at <= NOW())::integer as expired_sessions,
        MIN(created_at) as oldest_session,
        MAX(created_at) as newest_session
    FROM public.sessions;
END;
$$ LANGUAGE plpgsql;

-- Create a function to force logout a specific user
CREATE OR REPLACE FUNCTION force_logout_user(target_user_id uuid)
RETURNS boolean AS $$
BEGIN
    -- Delete user's session from our custom table
    DELETE FROM public.sessions WHERE user_id = target_user_id;
    
    -- Return true if session was found and deleted
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create a function to extend user session
CREATE OR REPLACE FUNCTION extend_user_session(target_user_id uuid, extension_minutes integer DEFAULT 30)
RETURNS boolean AS $$
BEGIN
    -- Extend the session expiration time
    UPDATE public.sessions 
    SET expires_at = expires_at + (extension_minutes || ' minutes')::interval
    WHERE user_id = target_user_id AND expires_at > NOW();
    
    -- Return true if session was found and updated
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION cleanup_expired_sessions() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION cleanup_all_expired_sessions() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_session_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION force_logout_user(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION extend_user_session(uuid, integer) TO anon, authenticated;

-- Create an index for better performance on session cleanup
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id_expires ON public.sessions(user_id, expires_at);

-- Set up automatic cleanup (this would need to be configured in Supabase dashboard)
-- You can set up a cron job or use Supabase Edge Functions to call cleanup_expired_sessions() periodically

-- Example: Create a view for monitoring active sessions
CREATE OR REPLACE VIEW active_sessions_view AS
SELECT 
    s.user_id,
    s.created_at,
    s.expires_at,
    s.expires_at - NOW() as time_remaining,
    up.name as user_name,
    up.phone_number
FROM public.sessions s
LEFT JOIN public.user_profiles up ON s.user_id = up.id
WHERE s.expires_at > NOW()
ORDER BY s.expires_at ASC;

-- Grant access to the view
GRANT SELECT ON active_sessions_view TO anon, authenticated;

-- Add a trigger to automatically clean up sessions when users are deleted
CREATE OR REPLACE FUNCTION cleanup_user_sessions_on_delete()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM public.sessions WHERE user_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_cleanup_user_sessions ON auth.users;
CREATE TRIGGER trigger_cleanup_user_sessions
    AFTER DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION cleanup_user_sessions_on_delete();

-- Insert some helpful comments
COMMENT ON FUNCTION cleanup_expired_sessions() IS 'Cleans up expired sessions from the sessions table';
COMMENT ON FUNCTION get_session_stats() IS 'Returns statistics about current sessions';
COMMENT ON FUNCTION force_logout_user(uuid) IS 'Forces logout of a specific user by deleting their session';
COMMENT ON FUNCTION extend_user_session(uuid, integer) IS 'Extends a user session by the specified number of minutes';
COMMENT ON VIEW active_sessions_view IS 'View showing all currently active sessions with user information';
