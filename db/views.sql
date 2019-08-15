USE newbee;

DROP VIEW InQueue;
-- list of users who are waiting and not have a court
-- We will grab users here when a court is ready to take new waiting users
CREATE VIEW InQueue AS
SELECT *
FROM Players
WHERE 
DATE(wait_start) = CURDATE()
and
wait_start <= CURRENT_TIMESTAMP
and
wait_end IS NULL
and
court_id IS NULL
ORDER BY 
wait_start
;


-- list of users who are waiting and have a court assigned
-- We will display this next to the court
DROP VIEW GetReady;
CREATE VIEW GetReady AS
SELECT *
FROM Players
WHERE 
DATE(wait_start) = CURDATE()
and
wait_start <= CURRENT_TIMESTAMP
and
wait_end IS NULL
and
court_id IS NOT NULL
;

-- list of users who are currently playing on a court
-- We will grab users here when a court is ready to take new waiting users
DROP VIEW Playing;
CREATE VIEW Playing AS
SELECT *
FROM Players
WHERE 
DATE(game_start) = CURDATE()
and
game_start <= CURRENT_TIMESTAMP
and
game_end IS NULL
;


-- list of users who can check-in
DROP VIEW CheckIn;
CREATE VIEW CheckIn AS
SELECT * 
FROM users
WHERE
users.id NOT IN (
  select user_id 
  from players
  where DATE(check_in) = CURDATE()
);

/*  Execute this file from the command line by typing:
  mysql -u root -p < db/views.sql

 *  to create the views.*/