-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 08 月 20 日 01:27
-- 服务器版本: 5.5.53-log
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `buptca`
--

-- --------------------------------------------------------

--
-- 表的结构 `all_activities`
--

CREATE TABLE IF NOT EXISTS `all_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(255) NOT NULL,
  `activity_spot` varchar(255) NOT NULL,
  `activity_detail` varchar(512) NOT NULL,
  `activity_pic1` varchar(255) NOT NULL,
  `activity_pic2` varchar(255) NOT NULL,
  `activity_pic3` varchar(255) NOT NULL,
  `moral_score` varchar(255) NOT NULL COMMENT '不加德育分此项为0',
  `hold_department` varchar(255) NOT NULL COMMENT '易班/校级/各学院名',
  `ifstrong` int(11) NOT NULL COMMENT '易班/校级默认为1，其他根据个人选择0或1',
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `infocollect_name` int(11) NOT NULL,
  `infocollect_collg` int(11) NOT NULL,
  `infocollect_gender` int(11) NOT NULL,
  `infocollect_sid` int(11) NOT NULL,
  `infocollect_mobile` int(11) NOT NULL,
  `infocollect_qq` int(11) NOT NULL,
  `infocollect_email` int(11) NOT NULL,
  `infocollect_other` varchar(255) NOT NULL COMMENT 'other为管理员自己需要的其他信息的名目',
  `infocollect_other_des` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='所有活动信息的表' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `all_activities`
--

INSERT INTO `all_activities` (`id`, `activity_name`, `activity_spot`, `activity_detail`, `activity_pic1`, `activity_pic2`, `activity_pic3`, `moral_score`, `hold_department`, `ifstrong`, `start_time`, `end_time`, `infocollect_name`, `infocollect_collg`, `infocollect_gender`, `infocollect_sid`, `infocollect_mobile`, `infocollect_qq`, `infocollect_email`, `infocollect_other`, `infocollect_other_des`) VALUES
(1, '震惊！易班程序员竟齐聚风味餐厅?!', '风味餐厅', '0', 'image/collg-yiban.jpg', '2', '3', '0', 'yiban', 1, '2017-08-23 00:00:00', '2017-08-27 00:00:00', 0, 0, 0, 0, 0, 0, 0, '0', '0'),
(4, '震惊！校园歌手大赛背后的黑幕是...', '', '', 'image/collg-school.jpg', '2', '3', '0', 'school', 1, '2017-08-15 00:00:00', '2017-08-21 00:00:00', 0, 0, 0, 0, 0, 0, 0, '', ''),
(5, '震惊！校园歌手大赛竟定于感恩节召开', '', '', 'image/collg-school.jpg', '2', '3', '0', '邮政|经管', 1, '2017-08-14 00:00:00', '2017-08-14 00:00:00', 0, 0, 0, 0, 0, 0, 0, '', ''),
(6, '震惊！校园歌手大赛竟定于愚人节召开', '3', '2', 'image/collg-school.jpg', '2', '3', '0', '电子', 1, '2017-08-01 00:00:00', '2017-08-07 00:00:00', 0, 0, 0, 0, 0, 0, 0, '', ''),
(7, '大家一起game吧！', '小树林', '3 人', 'image/collg-yiban.jpg', '2', '3', '1', '网安|计算机|树莓', 1, '2017-08-01 00:00:00', '2017-08-01 00:00:00', 1, 1, 1, 1, 1, 1, 1, '胸围', 'eg：80B');

-- --------------------------------------------------------

--
-- 表的结构 `my_activity`
--

CREATE TABLE IF NOT EXISTS `my_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `activity_title` varchar(50) NOT NULL,
  `activity_info` varchar(500) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `personal_activity`
--

CREATE TABLE IF NOT EXISTS `personal_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `activity_title` varchar(50) NOT NULL,
  `activity_info` varchar(500) NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `moral_score` float NOT NULL,
  `state` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `ybid` int(11) NOT NULL,
  `stuid` int(11) NOT NULL,
  `collg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`ybid`, `stuid`, `collg`) VALUES
(123456, 233, '网安'),
(456789, 322, '计算机');

-- --------------------------------------------------------

--
-- 表的结构 `user_star`
--

CREATE TABLE IF NOT EXISTS `user_star` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ybid` int(11) NOT NULL,
  `activityid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user_star`
--

INSERT INTO `user_star` (`id`, `ybid`, `activityid`) VALUES
(1, 123456, 4),
(2, 123456, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
