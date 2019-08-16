const router = require('express').Router();
const controller = require('./controllers/controller');
const seeding = require('../db/seedDB');

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
router.get('/getQueue', controller.getQueue);
// //users not have checked in
router.get('/getCheckin/:keyword', controller.getCheckIn);

router.post('/checkIn/:user_id', controller.userCheckIn);

router.get('/seed/user', seeding.user);
router.get('/seed/player', seeding.player);
router.get('/seed/court', seeding.court);
router.get('/seed/activecourt', seeding.activecourt);

router.get('/view/active', seeding.ActiveCourtsToday);
router.get('/view/viewinqueue', seeding.viewinqueue);
router.get('/view/viewready', seeding.viewready);
router.get('/view/viewPlaying', seeding.viewPlaying);
router.get('/view/viewcheckin', seeding.viewcheckin);

// //users are playing on a court
// router.get('/courts/:courtid/gamelist',controller.getGamelist);
// //users are ready to start a game on a court
// router.get('./courts/:courtid/waitinglist',controller.getWaitingList);

module.exports = router;
