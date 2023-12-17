-- Games table
CREATE TABLE `games` (
  `id` char(60) NOT NULL,
  `name` char(32) DEFAULT NULL,
  `title` char(32) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
