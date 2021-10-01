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
<<<<<<< HEAD
  `price` float NOT NULL,
=======
  `price` FLOAT(11) NOT NULL,
>>>>>>> dba086f431cd0bfc40074c1c070075d61e611b11
  `txid` varchar(150) DEFAULT NULL,
  `tx_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

<<<<<<< HEAD
=======
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

>>>>>>> dba086f431cd0bfc40074c1c070075d61e611b11

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `user_pw` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4;


INSERT INTO user (user_id, user_pw) VALUES ('0000', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0000,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0001', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0001,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0002', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0002,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0003', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0003,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0004', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0004,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0005', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0005,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0006', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0006,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0007', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0007,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0008', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0008,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0009', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0009,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0010', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0010,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0011', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0011,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0012', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0012,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0013', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0013,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0014', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0014,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0015', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0015,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0016', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0016,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0017', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0017,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0018', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0018,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0019', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0019,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0020', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0020,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0021', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0021,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0022', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0022,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0023', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0023,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0024', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0024,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0025', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0025,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0026', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0026,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0027', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0027,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0028', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0028,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0029', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0029,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0030', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0030,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0031', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0031,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0032', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0032,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0033', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0033,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0034', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0034,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0035', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0035,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0036', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0036,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0037', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0037,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0038', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0038,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0039', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0039,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0040', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0040,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0041', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0041,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0042', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0042,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0043', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0043,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0044', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0044,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0045', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0045,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0046', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0046,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0047', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0047,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0048', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0048,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0049', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0049,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0050', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0050,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0051', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0051,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0052', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0052,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0053', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0053,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0054', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0054,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0055', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0055,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0056', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0056,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0057', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0057,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0058', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0058,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0059', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0059,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0060', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0060,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0061', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0061,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0062', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0062,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0063', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0063,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0064', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0064,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0065', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0065,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0066', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0066,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0067', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0067,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0068', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0068,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0069', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0069,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0070', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0070,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0071', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0071,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0072', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0072,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0073', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0073,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0074', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0074,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0075', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0075,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0076', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0076,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0077', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0077,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0078', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0078,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0079', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0079,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0080', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0080,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0081', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0081,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0082', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0082,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0083', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0083,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0084', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0084,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0085', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0085,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0086', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0086,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0087', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0087,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0088', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0088,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0089', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0089,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0090', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0090,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0091', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0091,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0092', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0092,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0093', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0093,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0094', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0094,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0095', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0095,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0096', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0096,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0097', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0097,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0098', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0098,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0099', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0099,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0100', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0100,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0101', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0101,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0102', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0102,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0103', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0103,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0104', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0104,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0105', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0105,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0106', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0106,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0107', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0107,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0108', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0108,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0109', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0109,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0110', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0110,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0111', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0111,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0112', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0112,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0113', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0113,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0114', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0114,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0115', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0115,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0116', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0116,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0117', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0117,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0118', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0118,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0119', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0119,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0120', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0120,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0121', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0121,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0122', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0122,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0123', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0123,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0124', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0124,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0125', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0125,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0126', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0126,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0127', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0127,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0128', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0128,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0129', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0129,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0130', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0130,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0131', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0131,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0132', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0132,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0133', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0133,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0134', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0134,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0135', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0135,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0136', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0136,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0137', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0137,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0138', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0138,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0139', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0139,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0140', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0140,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0141', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0141,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0142', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0142,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0143', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0143,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0144', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0144,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0145', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0145,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0146', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0146,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0147', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0147,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0148', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0148,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0149', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0149,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0150', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0150,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0151', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0151,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0152', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0152,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0153', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0153,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0154', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0154,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0155', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0155,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0156', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0156,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0157', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0157,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0158', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0158,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0159', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0159,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0160', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0160,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0161', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0161,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0162', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0162,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0163', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0163,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0164', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0164,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0165', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0165,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0166', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0166,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0167', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0167,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0168', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0168,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0169', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0169,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0170', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0170,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0171', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0171,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0172', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0172,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0173', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0173,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0174', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0174,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0175', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0175,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0176', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0176,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0177', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0177,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0178', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0178,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0179', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0179,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0180', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0180,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0181', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0181,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0182', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0182,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0183', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0183,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0184', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0184,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0185', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0185,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0186', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0186,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0187', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0187,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0188', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0188,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0189', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0189,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0190', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0190,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0191', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0191,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0192', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0192,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0193', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0193,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0194', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0194,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0195', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0195,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0196', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0196,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0197', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0197,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0198', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0198,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0199', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0199,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0200', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0200,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0201', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0201,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0202', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0202,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0203', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0203,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0204', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0204,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0205', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0205,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0206', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0206,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0207', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0207,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0208', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0208,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0209', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0209,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0210', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0210,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0211', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0211,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0212', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0212,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0213', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0213,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0214', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0214,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0215', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0215,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0216', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0216,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0217', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0217,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0218', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0218,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0219', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0219,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0220', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0220,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0221', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0221,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0222', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0222,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0223', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0223,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0224', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0224,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0225', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0225,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0226', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0226,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0227', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0227,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0228', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0228,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0229', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0229,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0230', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0230,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0231', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0231,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0232', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0232,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0233', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0233,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0234', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0234,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0235', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0235,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0236', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0236,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0237', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0237,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0238', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0238,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0239', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0239,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0240', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0240,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0241', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0241,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0242', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0242,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0243', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0243,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0244', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0244,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0245', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0245,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0246', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0246,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0247', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0247,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0248', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0248,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0249', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0249,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0250', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0250,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0251', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0251,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0252', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0252,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0253', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0253,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0254', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0254,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0255', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0255,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0256', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0256,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0257', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0257,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0258', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0258,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0259', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0259,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0260', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0260,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0261', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0261,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0262', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0262,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0263', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0263,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0264', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0264,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0265', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0265,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0266', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0266,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0267', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0267,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0268', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0268,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0269', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0269,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0270', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0270,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0271', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0271,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0272', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0272,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0273', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0273,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0274', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0274,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0275', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0275,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0276', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0276,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0277', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0277,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0278', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0278,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0279', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0279,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0280', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0280,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0281', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0281,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0282', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0282,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0283', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0283,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0284', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0284,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0285', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0285,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0286', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0286,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0287', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0287,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0288', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0288,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0289', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0289,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0290', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0290,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0291', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0291,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0292', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0292,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0293', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0293,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0294', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0294,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0295', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0295,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0296', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0296,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0297', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0297,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0298', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0298,1000000,0,NOW());
INSERT INTO user (user_id, user_pw) VALUES ('0299', '1234');
INSERT INTO asset (user_idx, input, output, asset_date) VALUES (0299,1000000,0,NOW());

=======
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
>>>>>>> dba086f431cd0bfc40074c1c070075d61e611b11
