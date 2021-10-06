CREATE DATABASE IF NOT EXISTS `exchange`;
USE `exchange`;

CREATE TABLE IF NOT EXISTS `user` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_pw` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
  `user_wallet` VARCHAR(255) NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
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
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_transaction_order_list` (`sell_orderid`) USING BTREE,
	INDEX `FK_transaction_order_list_2` (`buy_orderid`) USING BTREE,

	FOREIGN KEY (`sell_orderid`) REFERENCES `exchange`.`order_list` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (`buy_orderid`) REFERENCES `exchange`.`order_list` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;



CREATE TABLE IF NOT EXISTS `user` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_pw` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;

-- INSERT INTO `user` ( `user_id`, `user_pw`) VALUES
-- 	('111', '111'),
-- 	('222', '222'),
-- 	('333', '333'),
-- 	('444', '444'),
-- 	('555', '555');

-- INSERT INTO `asset` (`user_idx`, `input`, `output`, `asset_date`) VALUES
-- 	(1, 1000000, 0, '2021-10-04 18:33:51'),
-- 	(2, 1000000, 0, '2021-10-04 18:33:51'),
-- 	(3, 1000000, 0, '2021-10-04 18:33:51'),
-- 	(4, 1000000, 0, '2021-10-04 18:33:51'),
-- 	(5, 1000000, 0, '2021-10-04 18:33:51');

-- INSERT INTO `coin` (`user_idx`, `c_input`, `c_output`, `coin_date`, `coin_id`) VALUES
-- 	(1, 10000, 0, '2021-10-04 18:34:45', 1),
-- 	(2, 10000, 0, '2021-10-04 18:34:45', 1),
-- 	(3, 10000, 0, '2021-10-04 18:34:45', 1),
-- 	(4, 10000, 0, '2021-10-04 18:34:45', 1),
-- 	(5, 10000, 0, '2021-10-04 18:34:45', 1);

-- INSERT INTO `order_list` ( `user_idx`, `price`, `qty`, `order_type`, `leftover`, `order_date`, `coin_id`, `del`) VALUES
-- 	( 3, 50, 10, 0, 0, '2021-10-05 14:01:52.87', 1, 0),
-- 	( 2, 50, 10, 0, 0, '2021-10-05 14:01:59.82', 1, 0),
-- 	( 3, 900, 50, 0, 0, '2021-10-05 14:02:11.43', 1, 0),
-- 	( 1, 40, 100, 1, 30, '2021-10-05 14:02:23.71', 1, 0),
-- 	( 1, 40, 100, 1, 100, '2021-10-05 14:03:12.20', 1, 0),
-- 	( 1, 200, 100, 1, 100, '2021-10-05 14:03:22.73', 1, 0),
-- 	( 1, 800, 100, 1, 100, '2021-10-05 14:03:32.74', 1, 0);


--   INSERT INTO `transaction` (`sell_orderid`, `sell_amount`, `sell_commission`, `buy_orderid`, `buy_amount`, `buy_commission`, `price`, `txid`, `tx_date`, `coin_id`) VALUES
-- 	(1, 100, 100, 2, 200, 100, 951, NULL, '2021-10-05 13:21:39.54', 1),
-- 	(1, 100, 100, 2, 200, 100, 850, NULL, '2021-10-05 13:22:39.60', 1),
-- 	(1, 100, 100, 2, 200, 100, 780, NULL, '2021-10-05 13:23:39.67', 1),
-- 	(1, 100, 100, 2, 200, 100, 4, NULL, '2021-10-05 13:24:39.72', 1),
-- 	(1, 100, 100, 2, 200, 100, 769, NULL, '2021-10-05 13:25:39.80', 1),
-- 	(1, 100, 100, 2, 200, 100, 540, NULL, '2021-10-05 13:26:39.82', 1),
-- 	(1, 100, 100, 2, 200, 100, 624, NULL, '2021-10-05 13:27:39.84', 1),
-- 	(1, 100, 100, 2, 200, 100, 992, NULL, '2021-10-05 13:28:39.86', 1),
-- 	(1, 100, 100, 2, 200, 100, 779, NULL, '2021-10-05 13:29:39.87', 1),
-- 	(1, 100, 100, 2, 200, 100, 122, NULL, '2021-10-05 13:30:39.89', 1),
-- 	(1, 100, 100, 2, 200, 100, 582, NULL, '2021-10-05 13:31:39.91', 1),
-- 	(1, 100, 100, 2, 200, 100, 648, NULL, '2021-10-05 13:32:39.94', 1),
-- 	(1, 100, 100, 2, 200, 100, 735, NULL, '2021-10-05 13:33:39.96', 1),
-- 	(1, 100, 100, 2, 200, 100, 372, NULL, '2021-10-05 13:34:39.97', 1),
-- 	(1, 100, 100, 2, 200, 100, 39, NULL, '2021-10-05 13:35:39.99', 1),
-- 	(1, 100, 100, 2, 200, 100, 236, NULL, '2021-10-05 13:36:40.01', 1),
-- 	(1, 100, 100, 2, 200, 100, 692, NULL, '2021-10-05 13:37:40.02', 1),
-- 	(1, 100, 100, 2, 200, 100, 652, NULL, '2021-10-05 13:38:40.04', 1),
-- 	(1, 100, 100, 2, 200, 100, 770, NULL, '2021-10-05 13:39:40.06', 1),
-- 	(1, 100, 100, 2, 200, 100, 78, NULL, '2021-10-05 13:40:40.09', 1),
-- 	(1, 100, 100, 2, 200, 100, 531, NULL, '2021-10-05 13:41:40.11', 1),
-- 	(1, 100, 100, 2, 200, 100, 280, NULL, '2021-10-05 13:42:40.12', 1),
-- 	(1, 100, 100, 2, 200, 100, 48, NULL, '2021-10-05 13:43:40.14', 1),
-- 	(1, 100, 100, 2, 200, 100, 41, NULL, '2021-10-05 13:44:40.16', 1),
-- 	(1, 100, 100, 2, 200, 100, 777, NULL, '2021-10-05 13:45:40.19', 1),
-- 	(1, 100, 100, 2, 200, 100, 148, NULL, '2021-10-05 13:46:40.22', 1),
-- 	(1, 100, 100, 2, 200, 100, 67, NULL, '2021-10-05 13:47:40.25', 1),
-- 	(1, 100, 100, 2, 200, 100, 614, NULL, '2021-10-05 13:48:40.29', 1),
-- 	(1, 100, 100, 2, 200, 100, 211, NULL, '2021-10-05 13:49:40.31', 1),
-- 	(1, 100, 100, 2, 200, 100, 853, NULL, '2021-10-05 13:50:40.32', 1),
-- 	(1, 100, 100, 2, 200, 100, 965, NULL, '2021-10-05 13:51:40.34', 1),
-- 	(1, 100, 100, 2, 200, 100, 100, NULL, '2021-10-05 13:52:40.37', 1),
-- 	(1, 100, 100, 2, 200, 100, 263, NULL, '2021-10-05 13:53:40.39', 1),
-- 	(1, 100, 100, 2, 200, 100, 7, NULL, '2021-10-05 13:54:40.41', 1),
-- 	(1, 100, 100, 2, 200, 100, 573, NULL, '2021-10-05 13:55:40.42', 1),
-- 	(1, 100, 100, 2, 200, 100, 37, NULL, '2021-10-05 13:56:40.44', 1),
-- 	(1, 100, 100, 2, 200, 100, 525, NULL, '2021-10-05 13:57:40.46', 1),
-- 	(1, 100, 100, 2, 200, 100, 388, NULL, '2021-10-05 13:58:40.47', 1),
-- 	(1, 100, 100, 2, 200, 100, 568, NULL, '2021-10-05 13:59:40.49', 1),
-- 	(1, 100, 100, 2, 200, 100, 725, NULL, '2021-10-05 14:00:40.51', 1),
-- 	(1, 100, 100, 2, 200, 100, 115, NULL, '2021-10-05 14:01:40.52', 1),
-- 	(1, 100, 100, 2, 200, 100, 202, NULL, '2021-10-05 14:02:40.55', 1),
-- 	(1, 100, 100, 2, 200, 100, 859, NULL, '2021-10-05 14:03:40.58', 1),
-- 	(1, 100, 100, 2, 200, 100, 349, NULL, '2021-10-05 14:04:40.60', 1),
-- 	(1, 100, 100, 2, 200, 100, 562, NULL, '2021-10-05 14:05:40.61', 1),
-- 	(1, 100, 100, 2, 200, 100, 86, NULL, '2021-10-05 14:06:40.63', 1),
-- 	(1, 100, 100, 2, 200, 100, 569, NULL, '2021-10-05 14:07:40.66', 1),
-- 	(1, 100, 100, 2, 200, 100, 455, NULL, '2021-10-05 14:08:40.68', 1),
-- 	(1, 100, 100, 2, 200, 100, 723, NULL, '2021-10-05 14:09:40.71', 1),
-- 	(1, 100, 100, 2, 200, 100, 795, NULL, '2021-10-05 14:10:40.73', 1),
-- 	(1, 100, 100, 2, 200, 100, 834, NULL, '2021-10-05 14:11:40.75', 1),
-- 	(1, 100, 100, 2, 200, 100, 722, NULL, '2021-10-05 14:12:40.76', 1),
-- 	(1, 100, 100, 2, 200, 100, 728, NULL, '2021-10-05 14:13:40.78', 1),
-- 	(1, 100, 100, 2, 200, 100, 55, NULL, '2021-10-05 14:14:40.81', 1),
-- 	(1, 100, 100, 2, 200, 100, 564, NULL, '2021-10-05 14:15:40.83', 1),
-- 	(1, 100, 100, 2, 200, 100, 155, NULL, '2021-10-05 14:16:40.85', 1),
-- 	(1, 100, 100, 2, 200, 100, 404, NULL, '2021-10-05 14:17:40.86', 1),
-- 	(1, 100, 100, 2, 200, 100, 676, NULL, '2021-10-05 14:18:40.88', 1),
-- 	(1, 100, 100, 2, 200, 100, 211, NULL, '2021-10-05 14:19:40.90', 1),
-- 	(1, 100, 100, 2, 200, 100, 755, NULL, '2021-10-05 14:20:40.91', 1),
-- 	(1, 100, 100, 2, 200, 100, 839, NULL, '2021-10-05 14:21:40.93', 1),
-- 	(1, 100, 100, 2, 200, 100, 627, NULL, '2021-10-05 14:22:40.95', 1),
-- 	(1, 100, 100, 2, 200, 100, 940, NULL, '2021-10-05 14:23:40.96', 1),
-- 	(1, 100, 100, 2, 200, 100, 822, NULL, '2021-10-05 14:24:40.99', 1),
-- 	(1, 100, 100, 2, 200, 100, 869, NULL, '2021-10-05 14:25:41.01', 1),
-- 	(1, 100, 100, 2, 200, 100, 219, NULL, '2021-10-05 14:26:41.03', 1),
-- 	(1, 100, 100, 2, 200, 100, 520, NULL, '2021-10-05 14:27:41.05', 1),
-- 	(1, 100, 100, 2, 200, 100, 445, NULL, '2021-10-05 14:28:41.06', 1),
-- 	(1, 100, 100, 2, 200, 100, 558, NULL, '2021-10-05 14:29:41.08', 1),
-- 	(1, 100, 100, 2, 200, 100, 762, NULL, '2021-10-05 14:30:41.11', 1),
-- 	(1, 100, 100, 2, 200, 100, 293, NULL, '2021-10-05 14:31:41.13', 1),
-- 	(1, 100, 100, 2, 200, 100, 965, NULL, '2021-10-05 14:32:41.15', 1),
-- 	(1, 100, 100, 2, 200, 100, 775, NULL, '2021-10-05 14:33:41.16', 1),
-- 	(1, 100, 100, 2, 200, 100, 300, NULL, '2021-10-05 14:34:41.18', 1),
-- 	(1, 100, 100, 2, 200, 100, 594, NULL, '2021-10-05 14:35:41.21', 1),
-- 	(1, 100, 100, 2, 200, 100, 897, NULL, '2021-10-05 14:36:41.24', 1),
-- 	(1, 100, 100, 2, 200, 100, 331, NULL, '2021-10-05 14:37:41.26', 1),
-- 	(1, 100, 100, 2, 200, 100, 123, NULL, '2021-10-05 14:38:41.29', 1),
-- 	(1, 100, 100, 2, 200, 100, 215, NULL, '2021-10-05 14:39:41.31', 1),
-- 	(1, 100, 100, 2, 200, 100, 184, NULL, '2021-10-05 14:40:41.33', 1),
-- 	(1, 100, 100, 2, 200, 100, 452, NULL, '2021-10-05 14:41:41.36', 1),
-- 	(1, 100, 100, 2, 200, 100, 174, NULL, '2021-10-05 14:42:41.37', 1),
-- 	(1, 100, 100, 2, 200, 100, 42, NULL, '2021-10-05 14:43:41.39', 1),
-- 	(1, 100, 100, 2, 200, 100, 481, NULL, '2021-10-05 14:44:41.42', 1),
-- 	(1, 100, 100, 2, 200, 100, 309, NULL, '2021-10-05 14:45:41.44', 1),
-- 	(1, 100, 100, 2, 200, 100, 124, NULL, '2021-10-05 14:46:41.46', 1),
-- 	(1, 100, 100, 2, 200, 100, 787, NULL, '2021-10-05 14:47:41.47', 1),
-- 	(1, 100, 100, 2, 200, 100, 422, NULL, '2021-10-05 14:48:41.49', 1),
-- 	(1, 100, 100, 2, 200, 100, 918, NULL, '2021-10-05 14:49:41.51', 1),
-- 	(1, 100, 100, 2, 200, 100, 37, NULL, '2021-10-05 13:21:42.90', 1),
-- 	(1, 100, 100, 2, 200, 100, 487, NULL, '2021-10-05 13:22:42.98', 1),
-- 	(1, 100, 100, 2, 200, 100, 454, NULL, '2021-10-05 13:23:43.04', 1),
-- 	(1, 100, 100, 2, 200, 100, 870, NULL, '2021-10-05 13:24:43.08', 1),
-- 	(1, 100, 100, 2, 200, 100, 185, NULL, '2021-10-05 13:25:43.13', 1),
-- 	(1, 100, 100, 2, 200, 100, 139, NULL, '2021-10-05 13:26:43.16', 1),
-- 	(1, 100, 100, 2, 200, 100, 146, NULL, '2021-10-05 13:27:43.19', 1),
-- 	(1, 100, 100, 2, 200, 100, 581, NULL, '2021-10-05 13:28:43.22', 1),
-- 	(1, 100, 100, 2, 200, 100, 877, NULL, '2021-10-05 13:29:43.24', 1),
-- 	(1, 100, 100, 2, 200, 100, 892, NULL, '2021-10-05 13:30:43.27', 1),
-- 	( 1, 100, 100, 2, 200, 100, 619, NULL, '2021-10-05 13:31:43.30', 1),
-- 	( 1, 100, 100, 2, 200, 100, 819, NULL, '2021-10-05 13:32:43.31', 1),
-- 	( 1, 100, 100, 2, 200, 100, 219, NULL, '2021-10-05 13:33:43.33', 1),
-- 	( 1, 100, 100, 2, 200, 100, 111, NULL, '2021-10-05 13:34:43.36', 1),
-- 	( 1, 100, 100, 2, 200, 100, 846, NULL, '2021-10-05 13:35:43.38', 1),
-- 	( 1, 100, 100, 2, 200, 100, 110, NULL, '2021-10-05 13:36:43.40', 1),
-- 	( 1, 100, 100, 2, 200, 100, 550, NULL, '2021-10-05 13:37:43.43', 1),
-- 	( 1, 100, 100, 2, 200, 100, 248, NULL, '2021-10-05 13:38:43.45', 1),
-- 	( 1, 100, 100, 2, 200, 100, 184, NULL, '2021-10-05 13:39:43.46', 1),
-- 	( 1, 100, 100, 2, 200, 100, 86, NULL, '2021-10-05 13:40:43.48', 1),
-- 	( 1, 100, 100, 2, 200, 100, 710, NULL, '2021-10-05 13:41:43.50', 1),
-- 	( 1, 100, 100, 2, 200, 100, 273, NULL, '2021-10-05 13:42:43.51', 1),
-- 	( 1, 100, 100, 2, 200, 100, 649, NULL, '2021-10-05 13:43:43.54', 1),
-- 	( 1, 100, 100, 2, 200, 100, 191, NULL, '2021-10-05 13:44:43.56', 1),
-- 	( 1, 100, 100, 2, 200, 100, 233, NULL, '2021-10-05 13:45:43.59', 1),
-- 	( 1, 100, 100, 2, 200, 100, 71, NULL, '2021-10-05 13:46:43.61', 1),
-- 	( 1, 100, 100, 2, 200, 100, 993, NULL, '2021-10-05 13:47:43.63', 1),
-- 	( 1, 100, 100, 2, 200, 100, 662, NULL, '2021-10-05 13:48:43.65', 1),
-- 	( 1, 100, 100, 2, 200, 100, 249, NULL, '2021-10-05 13:49:43.66', 1),
-- 	( 1, 100, 100, 2, 200, 100, 604, NULL, '2021-10-05 13:50:43.68', 1),
-- 	( 1, 100, 100, 2, 200, 100, 179, NULL, '2021-10-05 13:51:43.70', 1),
-- 	( 1, 100, 100, 2, 200, 100, 839, NULL, '2021-10-05 13:52:43.71', 1),
-- 	( 1, 100, 100, 2, 200, 100, 94, NULL, '2021-10-05 13:53:43.73', 1),
-- 	( 1, 100, 100, 2, 200, 100, 960, NULL, '2021-10-05 13:54:43.75', 1),
-- 	( 1, 100, 100, 2, 200, 100, 714, NULL, '2021-10-05 13:55:43.78', 1),
-- 	( 1, 100, 100, 2, 200, 100, 566, NULL, '2021-10-05 13:56:43.81', 1),
-- 	( 1, 100, 100, 2, 200, 100, 53, NULL, '2021-10-05 13:57:43.83', 1),
-- 	( 1, 100, 100, 2, 200, 100, 66, NULL, '2021-10-05 13:58:43.85', 1),
-- 	( 1, 100, 100, 2, 200, 100, 44, NULL, '2021-10-05 13:59:43.86', 1),
-- 	( 1, 100, 100, 2, 200, 100, 0, NULL, '2021-10-05 14:00:43.89', 1),
-- 	( 1, 100, 100, 2, 200, 100, 53, NULL, '2021-10-05 14:01:43.91', 1),
-- 	( 1, 100, 100, 2, 200, 100, 739, NULL, '2021-10-05 14:02:43.94', 1),
-- 	( 1, 100, 100, 2, 200, 100, 447, NULL, '2021-10-05 14:03:43.96', 1),
-- 	( 1, 100, 100, 2, 200, 100, 916, NULL, '2021-10-05 14:04:43.99', 1),
-- 	( 1, 100, 100, 2, 200, 100, 169, NULL, '2021-10-05 14:05:44.01', 1),
-- 	( 1, 100, 100, 2, 200, 100, 685, NULL, '2021-10-05 14:06:44.03', 1),
-- 	( 1, 100, 100, 2, 200, 100, 232, NULL, '2021-10-05 14:07:44.05', 1),
-- 	( 1, 100, 100, 2, 200, 100, 739, NULL, '2021-10-05 14:08:44.06', 1),
-- 	( 1, 100, 100, 2, 200, 100, 116, NULL, '2021-10-05 14:09:44.08', 1),
-- 	( 1, 100, 100, 2, 200, 100, 507, NULL, '2021-10-05 14:10:44.10', 1),
-- 	( 1, 100, 100, 2, 200, 100, 363, NULL, '2021-10-05 14:11:44.11', 1),
-- 	( 1, 100, 100, 2, 200, 100, 245, NULL, '2021-10-05 14:12:44.13', 1),
-- 	( 1, 100, 100, 2, 200, 100, 799, NULL, '2021-10-05 14:13:44.15', 1),
-- 	( 1, 100, 100, 2, 200, 100, 954, NULL, '2021-10-05 14:14:44.18', 1),
-- 	( 1, 100, 100, 2, 200, 100, 665, NULL, '2021-10-05 14:15:44.20', 1),
-- 	( 1, 100, 100, 2, 200, 100, 482, NULL, '2021-10-05 14:16:44.23', 1),
-- 	( 1, 100, 100, 2, 200, 100, 370, NULL, '2021-10-05 14:17:44.25', 1),
-- 	( 1, 100, 100, 2, 200, 100, 953, NULL, '2021-10-05 14:18:44.26', 1),
-- 	( 1, 100, 100, 2, 200, 100, 955, NULL, '2021-10-05 14:19:44.29', 1),
-- 	( 1, 100, 100, 2, 200, 100, 66, NULL, '2021-10-05 14:20:44.33', 1),
-- 	( 1, 100, 100, 2, 200, 100, 64, NULL, '2021-10-05 14:21:44.36', 1),
-- 	( 1, 100, 100, 2, 200, 100, 500, NULL, '2021-10-05 14:22:44.39', 1),
-- 	( 1, 100, 100, 2, 200, 100, 649, NULL, '2021-10-05 14:23:44.42', 1),
-- 	( 1, 100, 100, 2, 200, 100, 194, NULL, '2021-10-05 14:24:44.48', 1),
-- 	( 1, 100, 100, 2, 200, 100, 368, NULL, '2021-10-05 14:25:44.52', 1),
-- 	( 1, 100, 100, 2, 200, 100, 750, NULL, '2021-10-05 14:26:44.56', 1),
-- 	( 1, 100, 100, 2, 200, 100, 508, NULL, '2021-10-05 14:27:44.61', 1),
-- 	( 1, 100, 100, 2, 200, 100, 810, NULL, '2021-10-05 14:28:44.64', 1),
-- 	( 1, 100, 100, 2, 200, 100, 697, NULL, '2021-10-05 14:29:44.66', 1),
-- 	( 1, 100, 100, 2, 200, 100, 866, NULL, '2021-10-05 14:30:44.67', 1),
-- 	( 1, 100, 100, 2, 200, 100, 676, NULL, '2021-10-05 14:31:44.69', 1),
-- 	( 1, 100, 100, 2, 200, 100, 897, NULL, '2021-10-05 14:32:44.72', 1),
-- 	( 1, 100, 100, 2, 200, 100, 288, NULL, '2021-10-05 14:33:44.74', 1),
-- 	( 1, 100, 100, 2, 200, 100, 161, NULL, '2021-10-05 14:34:44.77', 1),
-- 	( 1, 100, 100, 2, 200, 100, 100, NULL, '2021-10-05 14:35:44.79', 1),
-- 	( 1, 100, 100, 2, 200, 100, 380, NULL, '2021-10-05 14:36:44.81', 1),
-- 	( 1, 100, 100, 2, 200, 100, 974, NULL, '2021-10-05 14:37:44.85', 1),
-- 	( 1, 100, 100, 2, 200, 100, 455, NULL, '2021-10-05 14:38:44.87', 1),
-- 	( 1, 100, 100, 2, 200, 100, 794, NULL, '2021-10-05 14:39:44.89', 1),
-- 	( 1, 100, 100, 2, 200, 100, 327, NULL, '2021-10-05 14:40:44.91', 1),
-- 	( 1, 100, 100, 2, 200, 100, 417, NULL, '2021-10-05 14:41:44.92', 1),
-- 	( 1, 100, 100, 2, 200, 100, 749, NULL, '2021-10-05 14:42:44.94', 1),
-- 	( 1, 100, 100, 2, 200, 100, 770, NULL, '2021-10-05 14:43:44.96', 1),
-- 	( 1, 100, 100, 2, 200, 100, 193, NULL, '2021-10-05 14:44:44.97', 1),
-- 	( 1, 100, 100, 2, 200, 100, 376, NULL, '2021-10-05 14:45:45.00', 1),
-- 	( 1, 100, 100, 2, 200, 100, 386, NULL, '2021-10-05 14:46:45.02', 1),
-- 	( 1, 100, 100, 2, 200, 100, 127, NULL, '2021-10-05 14:47:45.04', 1),
-- 	( 1, 100, 100, 2, 200, 100, 662, NULL, '2021-10-05 14:48:45.07', 1),
-- 	( 1, 100, 100, 2, 200, 100, 947, NULL, '2021-10-05 14:49:45.09', 1),
-- 	( 1, 100, 100, 2, 200, 100, 977, NULL, '2021-10-05 14:50:45.11', 1),
-- 	( 1, 100, 100, 2, 200, 100, 399, NULL, '2021-10-05 14:51:45.12', 1),
-- 	( 1, 100, 100, 2, 200, 100, 643, NULL, '2021-10-05 14:52:45.14', 1),
-- 	( 1, 100, 100, 2, 200, 100, 550, NULL, '2021-10-05 14:53:45.16', 1),
-- 	( 1, 100, 100, 2, 200, 100, 779, NULL, '2021-10-05 14:54:45.17', 1),
-- 	( 1, 100, 100, 2, 200, 100, 436, NULL, '2021-10-05 14:55:45.19', 1),
-- 	( 1, 100, 100, 2, 200, 100, 80, NULL, '2021-10-05 14:56:45.22', 1),
-- 	( 1, 100, 100, 2, 200, 100, 856, NULL, '2021-10-05 14:57:45.24', 1),
-- 	( 1, 100, 100, 2, 200, 100, 306, NULL, '2021-10-05 14:58:45.27', 1),
-- 	( 1, 100, 100, 2, 200, 100, 955, NULL, '2021-10-05 14:59:45.30', 1),
-- 	( 1, 100, 100, 2, 200, 100, 556, NULL, '2021-10-05 15:00:45.31', 1);