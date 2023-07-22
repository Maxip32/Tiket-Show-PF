const {Router} = require('express');
const createArtist = require('../handlers/artistHandlers/createArtist');
const validationCreate = require("../middleware/validationArtist/validationCreate");
const validationId = require("../middleware/validationArtist/validationIdId");
const getANameArtist = require("../handlers/artistHandlers/getANameArtist");
const getIdArtist = require("../handlers/artistHandlers/getIdArtist");
const updateArtist = require("../handlers/artistHandlers/updateArtist");
const deleteArtist = require("../handlers/artistHandlers/deleteArtist");
const { allArtist } = require('../controllers/artistControllers/allArtist');

const artistRouter = Router();

/* 
C: create --> create
R: read --> get
U: update --> put / patch
D: delete --> delete
*/


/* 
params: id
name: name
all: all artist
*/

artistRouter.post('/createArtist', validationCreate, createArtist);
artistRouter.get('/allArtist', allArtist);
artistRouter.get('/?name=artist', getANameArtist);
artistRouter.get('/:idArtist', validationId, getIdArtist);
artistRouter.put('/update/:idArtist', validationId, updateArtist);
artistRouter.delete('/delete/:idArtist', validationId, deleteArtist);









module.exports = artistRouter;