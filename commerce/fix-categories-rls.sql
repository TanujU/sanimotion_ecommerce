-- Fix Row Level Security for categories table
-- Run this in your Supabase SQL Editor

-- Check if categories table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'categories'
);

-- View current data
SELECT * FROM categories;

-- Enable RLS (if not already enabled)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view active categories" ON categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON categories;
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;

-- Create a permissive policy that allows anyone to view active categories
CREATE POLICY "Enable read access for all users" ON categories
    FOR SELECT 
    USING (true);  -- Allow all reads (both authenticated and anonymous)

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'categories';

-- Grant SELECT permission to anon and authenticated roles
GRANT SELECT ON categories TO anon, authenticated;

-- Test query (should return categories without authentication)
SELECT id, name, description, is_active FROM categories WHERE is_active = true;

