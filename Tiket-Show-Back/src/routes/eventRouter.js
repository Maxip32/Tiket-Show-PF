const {Router} = require('express');

const {
    getEvent,
    getEvents
} = require('../controllers/eventControllers/getControllers')

const router = Router();

router.get('/getEvents', getEvents);

router.get('/getEvent/:id', getEvent);