-- Check if categories table exists and view its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'categories'
ORDER BY ordinal_position;

-- Check current categories
SELECT * FROM categories;

-- Insert sample categories if none exist
INSERT INTO categories (name, description, is_active, parent_id)
VALUES 
  ('Orthopedic Products', 'Orthopedic braces, supports, and medical devices', true, null),
  ('Medical Equipment', 'Professional medical equipment and diagnostic tools', true, null),
  ('Rehabilitation', 'Rehabilitation and physical therapy products', true, null),
  ('Surgical Supplies', 'Surgical instruments and supplies', true, null),
  ('Patient Care', 'Patient care and comfort products', true, null),
  ('Sports Medicine', 'Sports injury prevention and recovery products', true, null)
ON CONFLICT DO NOTHING;

-- Verify the insert
SELECT * FROM categories WHERE is_active = true AND parent_id IS NULL ORDER BY name;

-- Check RLS policies on categories table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'categories';

