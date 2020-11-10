-- MySQL Script generated by MySQL Workbench
-- Tue Oct  6 07:03:19 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SOMSAdb
-- -----------------------------------------------------
-- Database for the Marist Capping 2020 project.

-- -----------------------------------------------------
-- Schema SOMSAdb
--
-- Database for the Marist Capping 2020 project.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SOMSAdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `SOMSAdb` ;

-- -----------------------------------------------------
-- Table `SOMSAdb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`User` (
  `User_ID` INT NOT NULL AUTO_INCREMENT,
  `Search_History` JSON NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE INDEX `User_ID_UNIQUE` (`User_ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Admin` (
  `Admin_ID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(30) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  UNIQUE INDEX `Admin_ID_UNIQUE` (`Admin_ID` ASC) VISIBLE,
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Account` (
  `Account_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT NOT NULL,
  `Password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`Account_ID`, `User_ID`),
  UNIQUE INDEX `Account_ID_UNIQUE` (`Account_ID` ASC) VISIBLE,
  UNIQUE INDEX `User_ID_UNIQUE` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `User_ID`
    FOREIGN KEY (`User_ID`)
    REFERENCES `SOMSAdb`.`User` (`User_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Topic` (
  `Topic_ID` INT NOT NULL AUTO_INCREMENT,
  `Category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Topic_ID`),
  UNIQUE INDEX `Topic_ID_UNIQUE` (`Topic_ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Publisher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Publisher` (
  `Publisher_ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Publisher_ID`),
  UNIQUE INDEX `Publisher_ID_UNIQUE` (`Publisher_ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Sentiment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Sentiment` (
  `Sentiment_ID` INT NOT NULL AUTO_INCREMENT,
  `Confidence_Interval` INT NOT NULL,
  PRIMARY KEY (`Sentiment_ID`),
  UNIQUE INDEX `idSentiment_UNIQUE` (`Sentiment_ID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Topic_Article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Topic_Article` (
  `Topic_ID` INT NOT NULL,
  `Article_ID` INT NOT NULL,
  PRIMARY KEY (`Topic_ID`, `Article_ID`),
  CONSTRAINT `Topic_ID`
    FOREIGN KEY (`Topic_ID`)
    REFERENCES `SOMSAdb`.`Topic` (`Topic_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Article_ID`
    FOREIGN KEY (`Topic_ID` , `Article_ID`)
    REFERENCES `SOMSAdb`.`Article` (`Topic_ID` , `Article_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SOMSAdb`.`Article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SOMSAdb`.`Article` (
  `Article_ID` INT NOT NULL AUTO_INCREMENT,
  `Topic_ID` INT NOT NULL,
  `Publisher_ID` INT NOT NULL,
  `Sentiment_ID` INT NOT NULL,
  `Mentions` INT NOT NULL DEFAULT 0,
  `Followers` INT NOT NULL DEFAULT 0,
  `Views` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`Article_ID`, `Topic_ID`, `Publisher_ID`, `Sentiment_ID`),
  UNIQUE INDEX `Article_ID_UNIQUE` (`Article_ID` ASC) VISIBLE,
  INDEX `Topic_ID_idx` (`Topic_ID` ASC) VISIBLE,
  INDEX `Publisher_ID_idx` (`Publisher_ID` ASC) VISIBLE,
  INDEX `Sentiment_ID_idx` (`Sentiment_ID` ASC) VISIBLE,
  CONSTRAINT `Article_Topic_ID`
    FOREIGN KEY (`Topic_ID`)
    REFERENCES `SOMSAdb`.`Topic_Article` (`Topic_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Publisher_ID`
    FOREIGN KEY (`Publisher_ID`)
    REFERENCES `SOMSAdb`.`Publisher` (`Publisher_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Sentiment_ID`
    FOREIGN KEY (`Sentiment_ID`)
    REFERENCES `SOMSAdb`.`Sentiment` (`Sentiment_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;