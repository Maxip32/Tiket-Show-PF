const {Router} = require('express');
const findCity = require('../handlers/cityHandler/city');


const cityRouter = Router();

cityRouter.get('/:name', findCity);

module.exports = cityRouter