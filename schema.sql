BEGIN;
TRUNCATE "django_admin_log", "auth_permission", "auth_group", "auth_group_permissions", "django_session", "auth_user_groups", "auth_user_user_permissions", "PhotoMenu_menuitem", "auth_user", "PhotoMenu_menucategory", "PhotoMenu_restaurant", "django_content_type";
SELECT setval(pg_get_serial_sequence('"django_admin_log"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"auth_permission"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"auth_group"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"auth_user"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"django_content_type"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"PhotoMenu_restaurant"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"PhotoMenu_menucategory"','id'), 1, false);
SELECT setval(pg_get_serial_sequence('"PhotoMenu_menuitem"','id'), 1, false);

COMMIT;
