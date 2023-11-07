CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  pfp TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);


