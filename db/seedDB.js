const db = require('../server/model/model');

const createUser = `
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50),
  email VARCHAR(255),
  PRIMARY KEY (id)
);
`;

const createPlayers = `
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
`;

const createCourts = `
CREATE TABLE Courts(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
`;

const createActiveCourts = `
CREATE TABLE ActiveCourts(
  id INT NOT NULL AUTO_INCREMENT,
  court_id INT NOT NULL,
  capacity INT DEFAULT 4,
  name VARCHAR(255) NOT NULL,
  active_from DATETIME ,
  PRIMARY KEY (id),
  FOREIGN KEY (court_id) REFERENCES Courts(id)
);
`;

module.exports = {
  user: (req, res) => {
    db.query(createUser, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send('createUser');
      }
    });
  },
  player: (req, res) => {
    db.query(createPlayers, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send('createPlayers');
      }
    });
  },
  court: (req, res) => {
    db.query(createCourts, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send('createCourts');
      }
    });
  },

  activecourt: (req, res) => {
    // db.query('DROP TABLE ActiveCourts', (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).end();
    //   } else {
    db.query(createActiveCourts, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send('createActiveCourts');
      }
    });
    // }
    // });
  },

  ActiveCourtsToday: (req, res) => {
    db.query(
      `CREATE VIEW ActiveCourtsToday AS
    SELECT DISTINCT court_id, name, capacity
    FROM ActiveCourts
    WHERE DATE(active_from) = CURDATE()`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.send('viewActiveCourt');
        }
      }
    );
  },

  viewinqueue: (req, res) => {
    db.query(
      `
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
    `,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.send('viewinqueue');
        }
      }
    );
  },
  viewready: (req, res) => {
    db.query(
      `
    
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
ORDER BY wait_start
;
    `,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.send('view ready');
        }
      }
    );
  },
  viewPlaying: (req, res) => {
    db.query(
      `
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

    `,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.send('viewPlaying');
        }
      }
    );
  },
  viewcheckin: (req, res) => {
    db.query(
      `
    CREATE VIEW CheckIn AS
SELECT * 
FROM users
WHERE
users.id NOT IN (
  select user_id 
  from InQueue
)
and
users.id NOT IN (
  select user_id 
  from Playing
)
and
users.id NOT IN (
  select user_id 
  from GetReady
)
;
    `,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.send('viewcheckin');
        }
      }
    );
  },
};
