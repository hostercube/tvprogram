-- This script creates the admin user directly in Supabase Auth
-- You need to run this in Supabase SQL Editor or use the Supabase dashboard

-- First, let's create the admin user in auth.users table
-- Note: This should be done through Supabase Dashboard > Authentication > Users
-- Or you can use the Supabase client to sign up the admin user

-- Create admin user profile in our custom admin_users table
-- This will be linked to the Supabase Auth user
INSERT INTO admin_users (id, email, name, role, created_at, updated_at)
VALUES (
  -- You'll need to replace this UUID with the actual user ID from Supabase Auth
  -- after creating the admin user through the dashboard
  gen_random_uuid(),
  'admin@tvapp.com',
  'Admin User',
  'super_admin',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Grant admin permissions
-- This ensures the admin user has full access to all tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
