-- Categories Table
CREATE TABLE user_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
)

-- Softwares Users
CREATE TABLE softwares_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  username VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isactive boolean not null default true
)

-- Software categories
CREATE TABLE software_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE -- e.g., 'Windows', 'Mac'
);

-- Softwares
CREATE TABLE softwares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  image_url TEXT,
  file_url TEXT NOT NULL,
  category_id UUID REFERENCES software_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Softwares user categories
CREATE TABLE software_user_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  software_id UUID REFERENCES softwares(id) ON DELETE CASCADE,
  user_category_id UUID REFERENCES user_categories(id) ON DELETE CASCADE,
  UNIQUE (software_id, user_category_id)
);

-- trigger function for updated_at
-- CREATE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- Attach the trigger to tables
-- CREATE TRIGGER set_updated_at
-- BEFORE UPDATE ON softwares_users
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();

-- Config table - onedrive token
-- CREATE TABLE config (
--   key text PRIMARY KEY,
--   value text
-- );