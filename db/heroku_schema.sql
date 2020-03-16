USE awv1puzi7bfskd7g;
-- Create the burgers table --
CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NULL,
  devoured BOOLEAN,
  PRIMARY KEY (id)
);