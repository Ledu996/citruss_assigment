-- Deposits table
CREATE TABLE `deposits` (
  `id` char(60) NOT NULL,
  `user_id` char(60) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `isRefunded` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `deposits_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
