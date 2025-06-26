CREATE USER kanban WITH PASSWORD 'kanban' CREATEDB;
CREATE DATABASE kanban
    WITH
    OWNER = kanban
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;