const db = require('../model/model');

module.exports = {
  userCheckIn: (req, res) => {
    const params = req.params;
    let insertQuery = `
      INSERT INTO Players (user_id, display_name, notify_number, notify_email)
      VALUES  (${params.user_id},${params.display_name},${
      params.notify_number
    },${params.notify_email} )
    `;
    //console.log(insertQuery);
    // db.query(insertQuery, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).end();
    //   } else {
    //     console.log(data);
    //     res.status(201).end;
    //   }
    // });
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

  // getQueue: (req, res) => {},
  // //get waiting list by court id
  // getWaitingList: (req, res) => {},
  // //get game list by court id
  // getGamelist: (req, res) => {},
};
