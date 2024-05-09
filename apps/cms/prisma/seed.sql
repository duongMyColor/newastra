INSERT INTO UserRole (id)
SELECT 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'ADMIN');

INSERT INTO UserRole (id)
SELECT 'GENERAL'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'GENERAL');

INSERT INTO UserRole (id)
SELECT 'READ_ONLY'
WHERE NOT EXISTS (SELECT 1 FROM UserRole WHERE id = 'READ_ONLY');

INSERT INTO User (username, role, email, password, isDeleted, enabled, updatedAt)
SELECT 'SuperAdmin', 'ADMIN', 'superadmin@mycolor.com', '6f55e866038870eaf97f7bcfa81ce8e592cddbdb3c13d06e8cdaa57c6b1907ef', false, true, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM User WHERE username = 'SuperAdmin');