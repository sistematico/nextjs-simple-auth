-- SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'lucasbrum' AND pid <> pg_backend_pid();
DROP DATABASE IF EXISTS :dbname;
-- CREATE DATABASE :dbname WITH OWNER = :username;
-- CREATE DATABASE "lucasbrum" WITH OWNER = 'lucasbrum';