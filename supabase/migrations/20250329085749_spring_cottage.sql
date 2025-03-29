/*
  # Create menu items and translations tables

  1. New Tables
    - `menu_categories`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
    - `menu_category_translations`
      - `category_id` (uuid, foreign key)
      - `language` (text)
      - `name` (text)
    - `menu_items`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `price` (decimal)
      - `created_at` (timestamp)
    - `menu_item_translations`
      - `item_id` (uuid, foreign key)
      - `language` (text)
      - `name` (text)
      - `description` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage menu items
*/

-- Create menu_categories table
CREATE TABLE menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Create menu_category_translations table
CREATE TABLE menu_category_translations (
  category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  language text NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (category_id, language)
);

-- Create menu_items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create menu_item_translations table
CREATE TABLE menu_item_translations (
  item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  language text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (item_id, language)
);

-- Enable Row Level Security
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_translations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON menu_categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON menu_category_translations
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON menu_items
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON menu_item_translations
  FOR SELECT TO public USING (true);

-- Create policies for authenticated users to manage menu items
CREATE POLICY "Allow authenticated users to manage categories" ON menu_categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage category translations" ON menu_category_translations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage items" ON menu_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage item translations" ON menu_item_translations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);