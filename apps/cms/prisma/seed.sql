INSERT INTO UserRole (id) VALUES ('ADMIN'), ('GENERAL'), ('READ_ONLY');

INSERT INTO User (username, role, email, password, isDeleted, enabled, updatedAt) VALUES ('SuperAdmin', 'ADMIN', 'superadmin@mycolor.com', '6f55e866038870eaf97f7bcfa81ce8e592cddbdb3c13d06e8cdaa57c6b1907ef', false, true, CURRENT_TIMESTAMP);

