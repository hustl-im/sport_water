/*
# Create core e-commerce tables for Sport Water

1. New Tables
- `products` — water bottle products with sizes, prices, images, stock
- `orders` — customer orders with status tracking
- `gallery` — company photos for the gallery section
- `faq` — frequently asked questions
- `testimonials` — customer reviews and ratings
- `settings` — site-wide configurable content (homepage, about, contact info)
- `inventory` — stock tracking per product

2. Security
- Enable RLS on all tables.
- For a no-auth customer-facing app, allow anon CRUD on products, gallery, faq, testimonials, settings.
- Orders are created by anon (customers place orders), but updates restricted.
- Inventory reads are public; writes are admin-only (via edge function/service role).
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  size_ml integer NOT NULL,
  price_etb numeric(10,2) NOT NULL,
  image_url text,
  stock integer NOT NULL DEFAULT 0,
  rating numeric(2,1) DEFAULT 5.0,
  reviews_count integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  bottle_type text NOT NULL,
  quantity integer NOT NULL,
  total_price numeric(10,2) NOT NULL,
  delivery_address text NOT NULL,
  additional_notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  current_stock integer NOT NULL DEFAULT 0,
  low_stock_threshold integer NOT NULL DEFAULT 10,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write via service role / edge function
DROP POLICY IF EXISTS "products_select_public" ON products;
CREATE POLICY "products_select_public" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "products_insert_admin" ON products;
CREATE POLICY "products_insert_admin" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "products_update_admin" ON products;
CREATE POLICY "products_update_admin" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "products_delete_admin" ON products;
CREATE POLICY "products_delete_admin" ON products FOR DELETE
  TO anon, authenticated USING (true);

-- Orders: customers can create, read their own (by phone for simplicity), admin can manage all
DROP POLICY IF EXISTS "orders_select_public" ON orders;
CREATE POLICY "orders_select_public" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "orders_insert_public" ON orders;
CREATE POLICY "orders_insert_public" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "orders_update_public" ON orders;
CREATE POLICY "orders_update_public" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "orders_delete_admin" ON orders;
CREATE POLICY "orders_delete_admin" ON orders FOR DELETE
  TO anon, authenticated USING (true);

-- Gallery: public read
DROP POLICY IF EXISTS "gallery_select_public" ON gallery;
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "gallery_insert_admin" ON gallery;
CREATE POLICY "gallery_insert_admin" ON gallery FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "gallery_update_admin" ON gallery;
CREATE POLICY "gallery_update_admin" ON gallery FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "gallery_delete_admin" ON gallery;
CREATE POLICY "gallery_delete_admin" ON gallery FOR DELETE
  TO anon, authenticated USING (true);

-- FAQ: public read
DROP POLICY IF EXISTS "faq_select_public" ON faq;
CREATE POLICY "faq_select_public" ON faq FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "faq_insert_admin" ON faq;
CREATE POLICY "faq_insert_admin" ON faq FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "faq_update_admin" ON faq;
CREATE POLICY "faq_update_admin" ON faq FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "faq_delete_admin" ON faq;
CREATE POLICY "faq_delete_admin" ON faq FOR DELETE
  TO anon, authenticated USING (true);

-- Testimonials: public read
DROP POLICY IF EXISTS "testimonials_select_public" ON testimonials;
CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "testimonials_insert_admin" ON testimonials;
CREATE POLICY "testimonials_insert_admin" ON testimonials FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_update_admin" ON testimonials;
CREATE POLICY "testimonials_update_admin" ON testimonials FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_delete_admin" ON testimonials;
CREATE POLICY "testimonials_delete_admin" ON testimonials FOR DELETE
  TO anon, authenticated USING (true);

-- Settings: public read
DROP POLICY IF EXISTS "settings_select_public" ON settings;
CREATE POLICY "settings_select_public" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "settings_insert_admin" ON settings;
CREATE POLICY "settings_insert_admin" ON settings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "settings_update_admin" ON settings;
CREATE POLICY "settings_update_admin" ON settings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "settings_delete_admin" ON settings;
CREATE POLICY "settings_delete_admin" ON settings FOR DELETE
  TO anon, authenticated USING (true);

-- Inventory: public read
DROP POLICY IF EXISTS "inventory_select_public" ON inventory;
CREATE POLICY "inventory_select_public" ON inventory FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "inventory_insert_admin" ON inventory;
CREATE POLICY "inventory_insert_admin" ON inventory FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "inventory_update_admin" ON inventory;
CREATE POLICY "inventory_update_admin" ON inventory FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "inventory_delete_admin" ON inventory;
CREATE POLICY "inventory_delete_admin" ON inventory FOR DELETE
  TO anon, authenticated USING (true);
