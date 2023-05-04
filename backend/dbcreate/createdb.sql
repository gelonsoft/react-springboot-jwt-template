create user telagram_admin with encrypted password 'changemepassw1';
create user telagram_user with encrypted password 'changemepassw2';
CREATE DATABASE telagame_db WITH OWNER telagram_admin;
\c telagame_db postgres
ALTER DATABASE telagame_db SET search_path TO telegame,public;

CREATE SCHEMA telegame AUTHORIZATION telagram_admin;
/* further operations won't need superuser access */
\c telagame_db telagram_admin
/* allow telagram_user to access, but not create objects in the schema */
GRANT USAGE ON SCHEMA telegame TO telagram_user;

/* PUBLIC should not be allowed to execute functions created by telagram_admin */
ALTER DEFAULT PRIVILEGES FOR ROLE telagram_admin
REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

/* assuming that telagram_user should be allowed to do anything
   with data in all tables in that schema, allow access for all
   objects that telagram_admin will create there */
ALTER DEFAULT PRIVILEGES FOR ROLE telagram_admin IN SCHEMA telegame
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO telagram_user;
ALTER DEFAULT PRIVILEGES FOR ROLE telagram_admin IN SCHEMA telegame
GRANT SELECT, USAGE ON SEQUENCES TO telagram_user;
ALTER DEFAULT PRIVILEGES FOR ROLE telagram_admin IN SCHEMA telegame
GRANT EXECUTE ON FUNCTIONS TO telagram_user;
