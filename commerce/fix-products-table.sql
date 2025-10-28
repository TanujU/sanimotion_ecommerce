-- Complete Supabase Products Table Setup for Sanimotion E-commerce
-- This script will resolve the "Error fetching products from Supabase: {}" issue
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Create the products table with all required columns
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL CHECK (length(name) >= 1 AND length(name) <= 200),
    dosage TEXT NOT NULL CHECK (length(dosage) >= 1 AND length(dosage) <= 100),
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    description TEXT CHECK (description IS NULL OR length(description) <= 1000),
    image_url TEXT CHECK (image_url IS NULL OR length(image_url) <= 500),
    category TEXT DEFAULT 'injectable',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at);

-- Step 4: Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for public read access
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can manage all products" ON public.products
    FOR ALL USING (auth.role() = 'service_role');

-- Step 6: Grant necessary permissions
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

-- Step 7: Create function to update updated_at timestamp (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 8: Create trigger for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON public.products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Insert comprehensive sample medical products
INSERT INTO public.products (name, dosage, price, description, category) VALUES
('Juvederm Ultra 3', '1 ml', 178.50, 'Hyaluronic acid dermal filler for facial contouring and volume restoration', 'injectable'),
('Restylane Lyft', '1 ml', 165.00, 'Hyaluronic acid filler specifically designed for cheek augmentation and mid-face volumizing', 'injectable'),
('Belotero Balance', '1 ml', 155.75, 'Hyaluronic acid filler for fine lines and wrinkles with natural-looking results', 'injectable'),
('Radiesse', '1.5 ml', 195.00, 'Calcium hydroxylapatite filler for facial volumizing and contouring', 'injectable'),
('Teosyal RHA 2', '1 ml', 145.00, 'Hyaluronic acid filler for dynamic wrinkles and facial expressions', 'injectable'),
('Stylage M', '1 ml', 168.25, 'Hyaluronic acid filler for medium-depth wrinkles and facial lines', 'injectable'),
('Profhilo', '2 ml', 220.00, 'Hyaluronic acid skin booster for overall skin quality improvement and hydration', 'injectable'),
('Aqualyx', '8 ml', 185.50, 'Fat dissolving injection for body contouring and localized fat reduction', 'injectable'),
('Hyalone', '1 ml', 125.00, 'Hyaluronic acid filler for lip enhancement and augmentation', 'injectable'),
('Saypha', '1 ml', 135.75, 'Hyaluronic acid filler for facial volumizing and contouring', 'injectable'),
('Juvederm Voluma', '1 ml', 245.00, 'Hyaluronic acid filler for cheek augmentation and facial volumizing', 'injectable'),
('Restylane Defyne', '1 ml', 175.00, 'Hyaluronic acid filler for chin augmentation and jawline contouring', 'injectable'),
('Belotero Soft', '1 ml', 148.00, 'Hyaluronic acid filler for fine lines and subtle facial enhancement', 'injectable'),
('Radiesse Plus', '1.5 ml', 210.00, 'Enhanced calcium hydroxylapatite filler for facial volumizing', 'injectable'),
('Teosyal RHA 3', '1 ml', 155.00, 'Hyaluronic acid filler for deeper wrinkles and facial lines', 'injectable')
ON CONFLICT (id) DO NOTHING;

-- Step 10: Verify the table was created successfully
SELECT 
    'Products table created successfully!' as status,
    COUNT(*) as total_products,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_products
FROM public.products;

