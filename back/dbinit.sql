CREATE database IF NOT EXISTS `exchange`;
USE `exchange`;


CREATE TABLE IF NOT EXISTS `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `input` float NOT NULL DEFAULT 0,
  `output` float NOT NULL DEFAULT 0,
  `asset_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `order_type` int(11) NOT NULL,
  `leftover` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


INSERT INTO `order` (`id`, `user_idx`, `price`, `qty`, `order_type`, `leftover`, `order_date`) VALUES
	(1, 100, 100, 10, 0, 10, '2021-10-01 12:24:55'),
	(2, 200, 200, 10, 0, 10, '2021-10-01 12:24:55'),
	(3, 200, 250, 10, 0, 10, '2021-10-01 12:24:55'),
	(4, 300, 300, 10, 1, 10, '2021-10-01 12:24:55'),
	(5, 100, 400, 10, 1, 10, '2021-10-01 12:24:55'),
	(6, 200, 500, 10, 1, 10, '2021-10-01 12:24:55');

CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_orderid` int(11) NOT NULL,
  `a_amount` int(11) NOT NULL,
  `a_commission` int(11) NOT NULL,
  `b_orderid` int(11) NOT NULL,
  `b_amount` int(11) NOT NULL,
  `b_commission` int(11) NOT NULL,
  `price` FLOAT(11) NOT NULL,
  `txid` varchar(150) DEFAULT NULL,
  `tx_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_idx` INT(11) NOT NULL,
  `input` FLOAT(11) NOT NULL,
  `output` FLOAT(11) NOT NULL,
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `order` (
   `id` INT(11) NOT NULL AUTO_INCREMENT,
   `user_idx` INT(11) NOT NULL,
   `price` INT(11) NOT NULL,
   `qty` INT(11) NOT NULL,
   `order_type` INT(11) NOT NULL,
   `active` INT(11) NOT NULL,
   PRIMARY KEY (`id`)
)
ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `user_pw` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
