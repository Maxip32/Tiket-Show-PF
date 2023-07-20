const {Router} = require('express');

const {
    getEvent,
    getEvents
} = require('../controllers/eventControllers/getControllers')

const eventRouter = Router();

eventRouter.get('/getEvents', getEvents);

eventRouter.get('/getEvent/:id', getEvent);