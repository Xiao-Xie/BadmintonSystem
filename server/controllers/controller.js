const db = require('../model/model');

module.exports = {
  //get a list of active courts
  getCourtList: (req, res) => {
    db.query('select * from Courts', (err, data) => {
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
    console.log(req.params.courtid);
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
    //get ready user and save them to gamelist
    let updatePlaying = `
      INSERT INTO GameList  (player_id, court_id) VALUES

      (select player_id, court_id from GetReady where court_id=${courtid})
    `;
    db.query;

    //set end day for readylist

    //set court id for fist 4 in queue
  },

  endGame: (req, res) => {},

  // getQueue: (req, res) => {},
  // //get waiting list by court id
  // getWaitingList: (req, res) => {},
  // //get game list by court id
  // getGamelist: (req, res) => {},
};
