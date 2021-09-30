CREATE DATABASE IF NOT EXISTS `tteesstt`;
USE `tteesstt`;
CREATE TABLE IF NOT EXISTS `blike` (
  `blike_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `target_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `isLike` tinyint(4) NOT NULL,
  PRIMARY KEY (`blike_id`) USING BTREE,
  KEY `FK_blike_user` (`user_id`) USING BTREE,
  KEY `FK_blike_board` (`target_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `board` (
  `board_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `writer` int(11) unsigned NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updated` tinyint(4) DEFAULT 0,
  `hit` int(11) unsigned DEFAULT 0,
  `liked` smallint(6) DEFAULT 0,
  `disliked` smallint(6) DEFAULT 0,
  `del` tinyint(4) DEFAULT 0,
  `comment_cnt` smallint(5) unsigned DEFAULT 0,
  PRIMARY KEY (`board_id`) USING BTREE,
  KEY `FK_board_user` (`writer`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8;