const db = require('../model/model');

module.exports = {
  //get a list of court to config
  getCourtInventory: (req, res) => {
    db.query('select * from Courts', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.json(data);
      }
    });
  },

  openCourt: (req, res) => {
    let params = req.body;
    console.log(params);
  },

  //get a list of active courts
  getActiveCourts: (req, res) => {
    db.query('select * from ActiveCourtsToday', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.json(data);
      }
    });
  },

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

  //start game for one court
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

  // //get waiting list by court id
  // getWaitingList: (req, res) => {},
  // //get game list by court id
  // getGamelist: (req, res) => {},
};
