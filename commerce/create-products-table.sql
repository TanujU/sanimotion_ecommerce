-- Create products table for Sanimotion E-commerce
-- Run this script in your Supabase SQL editor

-- Create products table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products table (public read access)
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can manage all products" ON public.products
    FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON public.products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample medical products
INSERT INTO public.products (name, dosage, price, description, category) VALUES
('Juvederm Ultra 3', '1 ml', 178.50, 'Hyaluronic acid dermal filler for facial contouring', 'injectable'),
('Restylane Lyft', '1 ml', 165.00, 'Hyaluronic acid filler for cheek augmentation', 'injectable'),
('Belotero Balance', '1 ml', 155.75, 'Hyaluronic acid filler for fine lines and wrinkles', 'injectable'),
('Radiesse', '1.5 ml', 195.00, 'Calcium hydroxylapatite filler for facial volumizing', 'injectable'),
('Teosyal RHA 2', '1 ml', 145.00, 'Hyaluronic acid filler for dynamic wrinkles', 'injectable'),
('Stylage M', '1 ml', 168.25, 'Hyaluronic acid filler for medium-depth wrinkles', 'injectable'),
('Profhilo', '2 ml', 220.00, 'Hyaluronic acid skin booster for skin quality improvement', 'injectable'),
('Aqualyx', '8 ml', 185.50, 'Fat dissolving injection for body contouring', 'injectable'),
('Hyalone', '1 ml', 125.00, 'Hyaluronic acid filler for lip enhancement', 'injectable'),
('Saypha', '1 ml', 135.75, 'Hyaluronic acid filler for facial volumizing', 'injectable')
ON CONFLICT (id) DO NOTHING;

