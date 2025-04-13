/*
  # Create categories table for fashion e-commerce

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `parent_id` (uuid, references categories.id)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `categories` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to all authenticated users"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow insert access to authenticated users
CREATE POLICY "Allow insert access to authenticated users"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow update access to authenticated users
CREATE POLICY "Allow update access to authenticated users"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow delete access to authenticated users
CREATE POLICY "Allow delete access to authenticated users"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);