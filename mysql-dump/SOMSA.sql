SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
  `Account_ID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Favorites` json NOT NULL,
  `Is_Admin` int NOT NULL,
  PRIMARY KEY (`Account_ID`),
  UNIQUE KEY `Account_ID_UNIQUE` (`Account_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Account` (`Account_ID`, `Email`, `Password`, `Favorites`, `Is_Admin`) VALUES
(1,	'',	'admin',	'{}',	1);

DROP TABLE IF EXISTS `Sentiment`;
CREATE TABLE `Sentiment` (
  `Sentiment_ID` int NOT NULL AUTO_INCREMENT,
  `Confidence_Interval` int NOT NULL,
  `Table_Data` json NOT NULL,
  PRIMARY KEY (`Sentiment_ID`),
  UNIQUE KEY `idSentiment_UNIQUE` (`Sentiment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Topic`;
CREATE TABLE `Topic` (
  `Topic_ID` int NOT NULL AUTO_INCREMENT,
  `Topic_Name` varchar(60) NOT NULL,
  `Category` varchar(45) NOT NULL,
  PRIMARY KEY (`Topic_ID`),
  UNIQUE KEY `Topic_ID_UNIQUE` (`Topic_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;