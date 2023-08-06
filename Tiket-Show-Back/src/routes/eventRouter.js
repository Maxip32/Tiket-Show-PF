const {Router} = require('express');

const router = Router();

const {
    getEvent,
    getEvents,
    getEventByName,
    createEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventControllers/getControllers')



router.get('/getEvents', getEvents);

router.get('/getEvent/:id', getEvent);

router.get('/getEvent/name/:name', getEventByName);

router.post('/createEvent', createEvent);

router.delete('/deleteEvent/:id', deleteEvent);

router.put('/updateEvent/:id', updateEvent)
module.exports = router;