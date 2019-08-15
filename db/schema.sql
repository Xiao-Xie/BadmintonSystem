DROP DATABASE newbee;
CREATE DATABASE newbee;

USE newbee;

-- ALTER TABLE Users
-- MODIFY COLUMN phone_number VARCHAR(50);

CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
  email VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Players (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  display_name VARCHAR(255) NOT NULL,
  check_in DATETIME DEFAULT CURRENT_TIMESTAMP,
  notify_number INT,
  notify_email VARCHAR(255),
  wait_start DATETIME DEFAULT CURRENT_TIMESTAMP,
  wait_end DATETIME,
  game_start DATETIME,
  game_end DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Courts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ActiveCourts(
    id INT NOT NULL AUTO_INCREMENT,
    court_id INT NOT NULL,
    capacity INT DEFAULT 4,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (court_id) REFERENCES Courts(id)
);

-- CREATE TABLE WaitingList(
--   id INT NOT NULL AUTO_INCREMENT,
--   player_id INT NOT NULL,
--   court_id INT,
--   wait_start DATETIME DEFAULT CURRENT_TIMESTAMP,
--   wait_end DATETIME,
--   PRIMARY KEY (id),
--   FOREIGN KEY (court_id) REFERENCES Courts(id),
--   FOREIGN KEY (player_id) REFERENCES Players(id)
-- );

-- CREATE TABLE GameList(
--   id INT NOT NULL AUTO_INCREMENT,
--   player_id INT NOT NULL,
--   court_id INT NOT NULL,
--   game_start DATETIME DEFAULT CURRENT_TIMESTAMP,
--   game_end DATETIME,
--   PRIMARY KEY (id),
--   FOREIGN KEY (court_id) REFERENCES Courts(id),
--   FOREIGN KEY (player_id) REFERENCES Players(id)
-- )



/*  Execute this file from the command line by typing:
 mysql -u root -p < db/schema.sql
 *  to create the database and the tables.*/