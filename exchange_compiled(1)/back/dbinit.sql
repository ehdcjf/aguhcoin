CREATE DATABASE IF NOT EXISTS `exchange`;
USE `exchange`;

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_pw` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
  `user_wallet` VARCHAR(255) NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `order_list` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_idx` INT(11) NOT NULL,
	`price` INT(11) NOT NULL,
	`qty` INT(11) NOT NULL,
	`order_type` INT(11) NOT NULL,
	`leftover` INT(11) NOT NULL,
	`order_date` DATETIME(2) NULL DEFAULT current_timestamp(2),
	`coin_id` INT(11) NULL DEFAULT '1',
	`del` TINYINT(4) NULL DEFAULT '0',
	CONSTRAINT `FK_order_list_user` FOREIGN KEY (`user_idx`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `asset` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_idx` INT(11) NOT NULL,
	`input` INT(11) NOT NULL DEFAULT '0',
	`output` INT(11) NOT NULL DEFAULT '0',
	`asset_date` DATETIME NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `coin` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_idx` INT(11) NOT NULL,
	`c_input` FLOAT NOT NULL DEFAULT '0',
	`c_output` FLOAT NOT NULL DEFAULT '0',
	`coin_date` DATETIME NULL DEFAULT current_timestamp(),
	`coin_id` INT(11) NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE
)COLLATE='utf8_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `coininfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `transaction` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,    
	`sell_orderid` INT(11) NOT NULL,
	`sell_amount` INT(11) NOT NULL,
	`sell_commission` INT(11) NOT NULL,
	`buy_orderid` INT(11) NOT NULL,
	`buy_amount` INT(11) NOT NULL,
	`buy_commission` INT(11) NOT NULL,
	`price` INT(11) NOT NULL,
	`txid` VARCHAR(150) NULL COLLATE 'utf8mb4_general_ci',
	`tx_date` DATETIME(2) NULL DEFAULT current_timestamp(2),
	`coin_id` INT(11) NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE
	-- INDEX `FK_transaction_order_list` (`sell_orderid`) USING BTREE,
	-- INDEX `FK_transaction_order_list_2` (`buy_orderid`) USING BTREE,

	-- FOREIGN KEY (`sell_orderid`) REFERENCES `exchange`.`order_list` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	-- FOREIGN KEY (`buy_orderid`) REFERENCES `exchange`.`order_list` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;





INSERT INTO `user` ( `user_id`, `user_pw`) VALUES
	('111', '111'),
	('222', '222'),
	('333', '333'),
	('444', '444'),
	('555', '555');

INSERT INTO `asset` (`user_idx`, `input`, `output`, `asset_date`) VALUES
	(1, 1000000, 0, '2021-10-04 18:33:51'),
	(2, 1000000, 0, '2021-10-04 18:33:51'),
	(3, 1000000, 0, '2021-10-04 18:33:51'),
	(4, 1000000, 0, '2021-10-04 18:33:51'),
	(5, 1000000, 0, '2021-10-04 18:33:51');

INSERT INTO `coin` (`user_idx`, `c_input`, `c_output`, `coin_date`, `coin_id`) VALUES
	(1, 10000, 0, '2021-10-04 18:34:45', 1),
	(2, 10000, 0, '2021-10-04 18:34:45', 1),
	(3, 10000, 0, '2021-10-04 18:34:45', 1),
	(4, 10000, 0, '2021-10-04 18:34:45', 1),
	(5, 10000, 0, '2021-10-04 18:34:45', 1);

INSERT INTO `order_list` ( `user_idx`, `price`, `qty`, `order_type`, `leftover`, `order_date`, `coin_id`, `del`) VALUES
	( 3, 50, 10, 0, 0, '2021-10-05 14:01:52.87', 1, 0),
	( 2, 50, 10, 0, 0, '2021-10-05 14:01:59.82', 1, 0),
	( 3, 900, 50, 0, 0, '2021-10-05 14:02:11.43', 1, 0),
	( 1, 40, 100, 1, 30, '2021-10-05 14:02:23.71', 1, 0),
	( 1, 40, 100, 1, 100, '2021-10-05 14:03:12.20', 1, 0),
	( 1, 200, 100, 1, 100, '2021-10-05 14:03:22.73', 1, 0),
	( 1, 800, 100, 1, 100, '2021-10-05 14:03:32.74', 1, 0);

