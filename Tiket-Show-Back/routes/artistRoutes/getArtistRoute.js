const {Router} = require('express');
const getAllArtist = require("../../src/handlers/artistHandlers/getAllArtist")
const getANameArtist = require("../../src/handlers/artistHandlers/getANameArtist")
const getIdArtist = require("../../src/handlers/artistHandlers/getIdArtist")

const getArtistRouter = Router();

/* 
params: id
name: name
all: all artist
*/


getArtistRouter.get('/allArtist', getAllArtist);
getArtistRouter.get('/?name=name', getANameArtist);
getArtistRouter.get('/:idArtist', getIdArtist);

module.exports = getArtistRouter;