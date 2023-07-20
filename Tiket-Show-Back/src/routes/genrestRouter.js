const {Router} = require('express');
const getGenres = require('../handlers/genresHandler/getAllGenres');
const nameGenres = require('../handlers/genresHandler/getNameGenres');
const idGenres = require('../handlers/genresHandler/getIdGenres');
const validateId = require('../middleware/validationArtist/validationIdId')

const genrestRouter = Router();

genrestRouter.get('/allGenres', getGenres);
genrestRouter.get('/?name=genre', nameGenres);
genrestRouter.get('/:id', validateId, idGenres);