-- Users table with username validation
CREATE TABLE `users` (
  `id` char(60) NOT NULL,
  `username` char(32) DEFAULT NULL CHECK (username REGEXP '^[A-Za-z0-9]+$'),
  `password` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;