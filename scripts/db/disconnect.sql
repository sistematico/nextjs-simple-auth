-- CREATE DATABASE :dbname WITH OWNER = :username;
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = :dbname AND pid <> pg_backend_pid();