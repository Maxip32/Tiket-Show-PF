const {Router} = require('express');

const router = Router();

const {
    getEvent,
    getEvents,
    getEventByName,
} = require('../controllers/eventControllers/getControllers')



router.get('/getEvents', getEvents);

router.get('/getEvent/:id', getEvent);

router.get('/getEvent/name/:name', getEventByName);

module.exports = router;