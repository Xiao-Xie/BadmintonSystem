const router = require('express').Router();
const controller = require('./controllers/controller');

//Route different requests to different endpoints

//all courts with default values
router.get('/courtlist', controller.getCourtList);

// //active courts as of today
// router.get('/courts/active',controller.getActiveCourts);

//detail information of a court
//should return court info, waitinglist, gamelist
router.get('/courts/:courtid', controller.getCourtInfo);

//start game on a court
router.put('/courts/:courtid/start', controller.startGame);

//end game on a court
router.put('/courts/:courtid/end', controller.endGame);

// //users not have any court assigned
// router.get('/queue', controller.getQueue);

// //users are playing on a court
// router.get('/courts/:courtid/gamelist',controller.getGamelist);
// //users are ready to start a game on a court
// router.get('./courts/:courtid/waitinglist',controller.getWaitingList);

module.exports = router;
