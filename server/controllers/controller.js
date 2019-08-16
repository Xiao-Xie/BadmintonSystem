const db = require('../model/model');

module.exports = {
  //insert user to waiting list
  userCheckIn: (req, res) => {
    const user_id = req.params.user_id;

    let checkIn = `
    Insert INTO Players (user_id, display_name)
    SELECT id, CONCAT(first_name, ' ', last_name) as username from Users WHERE Users.id=${user_id};
    `;
    db.query(checkIn, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(201).send('user checked in!');
      }
    });
  },

  //get a list of active courts
  getCourtList: (req, res) => {
    db.query('select * from ActiveCourtsToday', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.json(data);
      }
    });
  },
  //get all user who's not playing or ready

  //get detail of one court
  getCourtInfo: (req, res) => {
    let courtid = req.params.courtid;
    let result = {
      getReady: [],
      playing: [],
      game_start: '',
    };
    db.query(`select * from Playing where court_id=${courtid}`, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        result.playing = data;
        db.query(
          `select * from GetReady where court_id=${courtid}`,
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).end;
            } else {
              result.getReady = data;
              res.send(result);
            }
          }
        );
      }
    });
  },

  startGame: (req, res) => {
    let courtid = req.params.courtid;

    //set wait_end, game_start for 'GetReady' of current court
    let setPlaying = `
      UPDATE GetReady
      SET wait_end = CURRENT_TIMESTAMP, game_start = CURRENT_TIMESTAMP
      WHERE court_id=${courtid}
      LIMIT 4
    `;

    let setPlayingFromQueue = `
      UPDATE InQueue
      SET court_id=${courtid}, wait_end = CURRENT_TIMESTAMP, game_start = CURRENT_TIMESTAMP
      LIMIT 4
    `;

    let getGetReady = `
      SELECT * 
      FROM GetReady
      WHERE court_id=${courtid}
      LIMIT 4
    `;

    let setGetReady = `
      UPDATE InQueue
      SET court_id=${courtid}
      LIMIT 4
    `;

    db.query(getGetReady, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        if (data.length === 0) {
          db.query(setPlayingFromQueue, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).end();
            } else {
              db.query(setGetReady, (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).end();
                } else {
                  res.status(200).end();
                }
              });
            }
          });
        } else {
          db.query(setPlaying, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).end();
            } else {
              db.query(setGetReady, (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).end();
                } else {
                  res.status(200).end();
                }
              });
            }
          });
        }
      }
    });
  },

  endGame: (req, res) => {
    let courtid = req.params.courtid;
    let setPlaying = `
    UPDATE Playing
    SET game_end = CURRENT_TIMESTAMP
    WHERE court_id=${courtid}
  `;
    db.query(setPlaying, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  },

  getQueue: (req, res) => {
    let getQueue = `SELECT * FROM InQueue`;
    db.query(getQueue, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  },

  getCheckIn: (req, res) => {
    let keyword = req.params.keyword;
    let getCheckIn = `SELECT * FROM CheckIn WHERE first_name like '%${keyword}%' OR last_name like '%${keyword}%'`;
    db.query(getCheckIn, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  },
  // //get waiting list by court id
  // getWaitingList: (req, res) => {},
  // //get game list by court id
  // getGamelist: (req, res) => {},
};
