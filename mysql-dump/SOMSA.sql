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

DROP TABLE IF EXISTS `Account_Topic`;
CREATE TABLE `Account_Topic` (
  `Account_ID` int NOT NULL,
  `Topic_ID` int NOT NULL,
  PRIMARY KEY (`Account_ID`, `Topic_ID`),
  CONSTRAINT `Account_ID`
    FOREIGN KEY (`Account_ID`)
    REFERENCES `SOMSAdb` . `Account` (`Account_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Topic_ID`
    FOREIGN KEY (`Topic_ID`)
    REFERENCES `SOMSAdb` . `Topic` (`Topic_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Sentiment`;
CREATE TABLE `Sentiment` (
  `Sentiment_ID` int NOT NULL AUTO_INCREMENT,
  `Sentiment` boolean NOT NULL,
  `Confidence_Interval` int NOT NULL,
  `Table_Data` json NOT NULL,
  PRIMARY KEY (`Sentiment_ID`),
  UNIQUE KEY `idSentiment_UNIQUE` (`Sentiment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Topic`;
CREATE TABLE `Topic` (
  `Topic_ID` int NOT NULL AUTO_INCREMENT,
  `Sentiment_ID` int NOT NULL, 
  `Topic_Name` varchar(200) NOT NULL,
  `Category` varchar(45) NOT NULL,
  PRIMARY KEY (`Topic_ID`),
  CONSTRAINT `Sentiment_ID`
    FOREIGN KEY (`Sentiment_ID`)
    REFERENCES `SOMSAdb` . `Sentiment` (`Sentiment_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  UNIQUE KEY `Topic_ID_UNIQUE` (`Topic_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;