\echo 'Delete and recreate porttracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE porttracker;
CREATE DATABASE porttracker;
\connect porttracker

\i porttracker-schema.sql
\i porttracker-seed.sql

\echo 'Delete and recreate porttracker_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE porttracker_test;
CREATE DATABASE porttracker_test;
\connect porttracker_test

\i porttracker-schema.sql
