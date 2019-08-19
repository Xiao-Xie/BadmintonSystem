const db = require('../model/model');

module.exports = {
  //insert user to waiting list
  userCheckIn: (req, res) => {
    const user_id = req.params.user_id;
    let checkIn = `
    Insert INTO Players (user_id, display_name, wait_start)
    SELECT id, CONCAT(first_name, ' ', last_name) as username, now() as wait_start from Users WHERE Users.id=${user_id};
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

  //get all user who's not playing or ready
  getQueue: (req, res) => {
    let getQueue = `SELECT * FROM InQueue ORDER BY 
    wait_start DESC`;
    db.query(getQueue, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(201).send(data);
      }
    });
  },

  //get all users who are not waiting, not playing, not ready
  getCheckIn: (req, res) => {
    let keyword = req.params.keyword;
    let getCheckIn = `SELECT * FROM CheckIn WHERE first_name like '%${keyword}%' OR last_name like '%${keyword}%'`;
    db.query(getCheckIn, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        //console.log(data);
        res.status(200).send(data);
      }
    });
  },

  leaveQueue: (req, res) => {
    const player_id = req.params.player_id;
    let leaveQueue = `
    UPDATE InQueue
    SET wait_end = curdate()
    WHERE id=${player_id}`;
    db.query(leaveQueue, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.status(201).send('user has been removed');
      }
    });
  },
  // //get waiting list by court id
  // getWaitingList: (req, res) => {},
  // //get game list by court id
  // getGamelist: (req, res) => {},
};
