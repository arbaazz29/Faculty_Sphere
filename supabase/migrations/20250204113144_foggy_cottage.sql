/*
  # Faculty Profiles Schema

  1. New Tables
    - `faculty_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `image` (text)
      - `department` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `faculty_profiles` table
    - Add policies for:
      - Users can read all profiles
      - Users can only update their own profile
*/

CREATE TABLE IF NOT EXISTS faculty_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  image text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

ALTER TABLE faculty_profiles ENABLE ROW LEVEL SECURITY;

-- Allow all users to read faculty profiles
CREATE POLICY "Anyone can view faculty profiles"
  ON faculty_profiles
  FOR SELECT
  TO public
  USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile"
  ON faculty_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON faculty_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);