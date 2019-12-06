const router = require('express').Router();
const controller = require('./controllers/controller');
const courts = require('./controllers/courts');
const players = require('./controllers/players');
const seeding = require('../db/seedDB');

//Route different requests to different endpoints

//all courts with default values
router.get('/courts/inventory', courts.getCourtInventory);

//activate a court for the day
router.post('/courts/open', courts.openCourt);

//active courts as of today
router.get('/courts/active', courts.getActiveCourts);

//detail information of a court
//should return court info, waitinglist, gamelist
router.get('/courts/:courtid', courts.getCourtInfo);

//start game on a court
router.put('/courts/:courtid/start', courts.startGame);

//end game on a court
router.put('/courts/:courtid/end', courts.endGame);

//users not have any court assigned
router.get('/getQueue', players.getQueue);
//users not have checked in
router.get('/getCheckin/:keyword', players.getCheckIn);
//check in a user -> add to player list
router.post('/checkIn/:user_id', players.userCheckIn);
//remove user from waiting list/queue
router.put('/leaveQueue/:player_id', players.leaveQueue);

//ETL processes
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



//-----------CLASSES------------//
//create class
router.post('/classes/new', classes.create);
//update class
router.put('/classes/:class_id', classes.update);

//-----------COACHES------------//
//create coach
router.post('/coaches/new', coaches.create);
//update coach info
router.put('/coaches/:coach_id', coaches.update);

//-----------Students------------//
//create student
router.post('/students/new', students.create);
//update student info
router.put('/students/:student_id', students.update);

//-----------CLASS ELECTIONS------------//
//create election
router.post('/elections/new', elections.create);
//update election info
router.put('/elections/:election_id', elections.update);
//delet election info
router.delete('/elections/:election_id', elections.update);

//-----------Checkin and Attendancy-------//
//create checkin record
router.post('/checkin/new', attendancy.create);
//update checkin record
router.put('/checkin/:checkin_id', checkin.update);
//delete checkin record
router.delete('/checkin/:checkin_id', checkin.delete);

module.exports = router;
