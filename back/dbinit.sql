CREATE DATABASE IF NOT EXISTS `exchange`;
USE `exchange`;

CREATE TABLE IF NOT EXISTS `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `input` float NOT NULL DEFAULT 0,
  `output` float NOT NULL DEFAULT 0,
  `asset_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `coin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `c_input` int(11) NOT NULL,
  `c_output` int(11) NOT NULL,
  `coin_date` datetime DEFAULT current_timestamp(),
  `coin_id` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `coininfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*INSERT INTO `coininfo` (`id`, `name`, `unit`) VALUES (1, 'aguhcoin', 'AGU');*/

CREATE TABLE IF NOT EXISTS `order_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `order_type` int(11) NOT NULL,
  `leftover` int(11) NOT NULL,
	`order_date` INT(11) DEFAULT unix_timestamp(),
  `coin_id` int(11) DEFAULT 1,
  `del` TINYINT(4) NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_orderid` int(11) NOT NULL,
  `a_amount` int(11) NOT NULL,
  `a_commission` int(11) NOT NULL,
  `b_orderid` int(11) NOT NULL,
  `b_amount` int(11) NOT NULL,
  `b_commission` int(11) NOT NULL,
  `price` float NOT NULL,
  `txid` varchar(150) DEFAULT NULL,
  `tx_date` datetime DEFAULT current_timestamp(),
  `coin_id` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `user_pw` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` ( `user_id`, `user_pw`) VALUES
	('111', '111'),
	('222', '222'),
	('333', '333'),
	('444', '444'),
	('555', '555');

INSERT INTO `asset` (`user_idx`, `input`, `output`, `asset_date`) VALUES
	(1, 100000, 0, '2021-10-04 18:33:51'),
	(2, 100000, 0, '2021-10-04 18:33:51'),
	(3, 100000, 0, '2021-10-04 18:33:51'),
	(4, 100000, 0, '2021-10-04 18:33:51'),
	(5, 100000, 0, '2021-10-04 18:33:51');

INSERT INTO `coin` (`user_idx`, `c_input`, `c_output`, `coin_date`, `coin_id`) VALUES
	(1, 10000, 0, '2021-10-04 18:34:45', 1),
	(2, 10000, 0, '2021-10-04 18:34:45', 1),
	(3, 10000, 0, '2021-10-04 18:34:45', 1),
	(4, 10000, 0, '2021-10-04 18:34:45', 1),
	(5, 10000, 0, '2021-10-04 18:34:45', 1);

INSERT INTO `order_list` ( `user_idx`, `price`, `qty`, `order_type`, `leftover`, `order_date`, `coin_id`, `del`) VALUES
	(1, 100, 100, 1, 0, 1633340231, 1, 0),
	( 2, 100, 100, 1, 0, 1633340231, 1, 0),
	( 3, 100, 100, 1, 0, 1633340231, 1, 0),
	( 4, 100, 100, 1, 0, 1633340231, 1, 0),
	( 5, 200, 100, 1, 100, 1633340231, 1, 0),
	( 4, 150, 100, 1, 100, 1633340231, 1, 0),
	( 3, 70, 100, 1, 0, 1633340231, 1, 0),
	( 1, 50, 100, 1, 0, 1633340231, 1, 0),
	( 1, 350, 100, 0, 0, 1633340671, 1, 0),
	( 6, 350, 100, 0, 0, 1633340695, 1, 0),
	( 6, 350, 100, 0, 0, 1633340714, 1, 0),
	( 6, 400, 100, 0, 0, 1633341810, 1, 0),
	( 6, 400, 100, 0, 0, 1633341931, 1, 0),
	( 6, 400, 100, 0, 0, 1633342005, 1, 0),
	( 6, 50, 10, 0, 0, 1633342071, 1, 0),
	( 6, 50, 10, 0, 0, 1633342074, 1, 0),
	( 5, 50, 10, 0, 0, 1633342079, 1, 0),
	( 3, 50, 10, 0, 0, 1633342085, 1, 0),
	( 2, 50, 10, 0, 10, 1633342089, 1, 0),
	( 2, 40, 10, 1, 0, 1633342140, 1, 0),
	( 2, 40, 10, 1, 0, 1633342146, 1, 0),
	( 2, 40, 10, 1, 0, 1633342214, 1, 0),
	( 2, 40, 10, 1, 0, 1633342286, 1, 0),
	( 2, 40, 10, 1, 10, 1633342506, 1, 0),
	( 2, 40, 10, 1, 10, 1633342572, 1, 0),
	( 2, 40, 10, 1, 10, 1633342655, 1, 0);