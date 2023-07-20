const {Router} = require('express');

const router = Router();

const {
    getEvent,
    getEvents
} = require('../controllers/eventControllers/getControllers')



router.get('/getEvents', getEvents);

router.get('/getEvent/:id', getEvent);

module.exports = router;