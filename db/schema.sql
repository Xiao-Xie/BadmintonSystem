DROP DATABASE newbee;
CREATE DATABASE newbee;

USE newbee;

CREATE TABLE Users (
  id INT auto_increment,
  username varchar(255) NOT NULL,
  primary key (id)
);

CREATE TABLE Messages(
    id int auto_increment,
    content varchar(255) not null,
    roomname varchar(255) not null,
    user_id int not null,
    primary key (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/