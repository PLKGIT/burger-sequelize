-- Drops the burgers database if it exists currently --
DROP DATABASE IF EXISTS burgerseq_db;
-- Creates the burgers database --
CREATE DATABASE burgerseq_db;
-- Use the burgers database --
USE burgerseq_db;
-- Create the burgers table --
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NULL,
  devoured BOOLEAN,
  PRIMARY KEY (id)
);