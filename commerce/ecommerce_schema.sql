-- E-commerce Database Schema
-- Based on the ERD diagram showing categories, products, orders, and order_items tables

-- Create categories table with hierarchical structure
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    disabled_at TIMESTAMP,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    brand TEXT,
    prescription_req BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    disabled_at TIMESTAMP,
    in_stock BOOLEAN DEFAULT true,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- References users table (not shown in ERD)
    guest_email TEXT,
    guest_name TEXT,
    total_amount INTEGER NOT NULL, -- Stored in cents for precision
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table (junction table)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price INTEGER NOT NULL, -- Stored in cents for precision
    total_price INTEGER NOT NULL, -- Stored in cents for precision
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON order_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add constraints for data integrity
ALTER TABLE categories ADD CONSTRAINT check_categories_name_not_empty 
    CHECK (LENGTH(TRIM(name)) > 0);

ALTER TABLE products ADD CONSTRAINT check_products_name_not_empty 
    CHECK (LENGTH(TRIM(name)) > 0);

-- Note: unit_price constraint removed as products table doesn't have unit_price column

ALTER TABLE orders ADD CONSTRAINT check_orders_total_amount_positive 
    CHECK (total_amount >= 0);

ALTER TABLE orders ADD CONSTRAINT check_orders_status_valid 
    CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'));

ALTER TABLE order_items ADD CONSTRAINT check_order_items_positive_prices 
    CHECK (unit_price >= 0 AND total_price >= 0);

-- Comments for documentation
COMMENT ON TABLE categories IS 'Product categories with hierarchical structure support';
COMMENT ON TABLE products IS 'Product catalog with category relationships';
COMMENT ON TABLE orders IS 'Customer orders with guest and user support';
COMMENT ON TABLE order_items IS 'Individual items within orders';

COMMENT ON COLUMN categories.parent_id IS 'Self-referencing foreign key for category hierarchy';
COMMENT ON COLUMN products.prescription_req IS 'Indicates if prescription is required for this product';
COMMENT ON COLUMN orders.total_amount IS 'Total order amount in cents';
COMMENT ON COLUMN order_items.unit_price IS 'Price per unit in cents';
COMMENT ON COLUMN order_items.total_price IS 'Total price for this line item in cents';
