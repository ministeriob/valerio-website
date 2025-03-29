/*
  # Fix schema relationships for menu tables

  1. Changes
    - Drop and recreate menu_category_translations table with correct foreign key
    - Drop and recreate menu_item_translations table with correct foreign key
    - Ensure all tables are in public schema
    - Re-enable RLS and policies

  2. Security
    - Re-enable RLS on all tables
    - Recreate policies for public read access
    - Recreate policies for authenticated users
*/

-- Drop existing tables to fix relationships
DROP TABLE IF EXISTS menu_item_translations;
DROP TABLE IF EXISTS menu_category_translations;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS menu_categories;

-- Recreate menu_categories
CREATE TABLE menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Recreate menu_category_translations with correct relationship
CREATE TABLE menu_category_translations (
  menu_category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  language text NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (menu_category_id, language)
);

-- Recreate menu_items
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Recreate menu_item_translations with correct relationship
CREATE TABLE menu_item_translations (
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  language text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (menu_item_id, language)
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