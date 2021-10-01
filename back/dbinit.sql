CREATE DATABASE IF NOT EXISTS `exchange` DEFAULT CHARACTER SET utf8; 
USE `exchange`;

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
  `reg_date` datetime NOT NULL,
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
