/*
 Navicat Premium Data Transfer

 Source Server         : localhost3306
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 26/10/2019 17:11:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `articleId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `authorID` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`articleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'tit1', 1, 1, 't77777', '2019-10-10 18:26:45', '2019-10-24 16:39:47');
INSERT INTO `article` VALUES (2, 'vdsfdsfdsfdsds', 1, 4, 't77777', '2019-10-22 19:29:31', '2019-10-24 16:39:52');
INSERT INTO `article` VALUES (3, 'sadad', 1, 6, '1111', '2019-10-23 19:20:10', '2019-10-24 16:40:23');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`categoryId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '前端');
INSERT INTO `category` VALUES (2, 'JAVA');
INSERT INTO `category` VALUES (3, 'PHP');
INSERT INTO `category` VALUES (4, 'Python');
INSERT INTO `category` VALUES (5, 'MySql');
INSERT INTO `category` VALUES (6, 'Node');
INSERT INTO `category` VALUES (7, 'App');
INSERT INTO `category` VALUES (8, 'Android');
INSERT INTO `category` VALUES (9, 'Ios');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isAdmin` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `userName`(`userName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'root', 'admin', 'root123456', '1');
INSERT INTO `user` VALUES (2, 'zqz', 'Chowqz', '6203a5d661b46c7d565fe891e2ca13ac', '0');
INSERT INTO `user` VALUES (4, 'zhangsan', 'Chowqz', '6203a5d661b46c7d565fe891e2ca13ac', '0');
INSERT INTO `user` VALUES (8, 'lisi', 'Chowqz', '6203a5d661b46c7d565fe891e2ca13ac', '0');
INSERT INTO `user` VALUES (14, 'wangwu', 'Chowqz', '6203a5d661b46c7d565fe891e2ca13ac', '0');

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE comment (
  commentId int(11) PRIMARY KEY AUTO_INCREMENT,
  articleId INT(11) NOT NULL,
  content VARCHAR(100),
  from_uid INT(11) NOT NULL,
  createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comment_article FOREIGN KEY(articleId) REFERENCES article(articleId)
)


CREATE TABLE comment_reply (
  id int(11) PRIMARY KEY AUTO_INCREMENT,
  commentId int(11) NOT NULL,
  content VARCHAR(100),
  from_uid INT(11) NOT NULL,
  to_uid INT(11) DEFAULT NULL,
  createTime DATETIME DEFAULT CURRENT_TIMESTAMP
)