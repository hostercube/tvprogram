-- Create default admin user for initial access
-- Note: In production, change these credentials immediately after first login

-- Insert default admin user
-- Email: admin@tvapp.com
-- Password: admin123 (hashed using bcrypt)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'admin@tvapp.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin User", "role": "admin"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Also insert into our admin_users table for additional admin features
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@tvapp.com', crypt('admin123', gen_salt('bf')), 'Admin User', 'super_admin')
ON CONFLICT (email) DO NOTHING;
