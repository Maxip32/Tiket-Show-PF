const {Router} = require('express');
const createArtist = require('../../src/handlers/artistHandlers/createArtist')
const validationCreate = require("../../middleware/validationArtist/validationCreate")
const getArtistRouter = require("../artistRoutes/getArtistRoute")

const artistRouter = Router();

/* 
C: create --> create
R: read --> get
U: update --> put / patch
D: delete --> delete
*/



artistRouter.post('/createArtist', validationCreate, createArtist)
artistRouter.use('/getArtist', getArtistRouter)

module.exports = artistRouter;