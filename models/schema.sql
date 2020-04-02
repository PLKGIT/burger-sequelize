-- Drops the burgers database if it exists currently --
DROP DATABASE IF EXISTS burgerseq_db;
-- Creates the burgers database --
CREATE DATABASE burgerseq_db;
-- Use the burgers database --
USE burgerseq_db;
-- Create the burgers table --
CREATE TABLE burgers (
  bid INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NOT NULL,
  cid INT(11),
  cust_name VARCHAR(50),
  devoured BOOLEAN DEFAULT 0,
  PRIMARY KEY (bid)
);
-- Create the burgers table --
CREATE TABLE customers (
  cid INT NOT NULL AUTO_INCREMENT,
  cust_name VARCHAR(50) NOT NULL,
  email_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (cid)
);