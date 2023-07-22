const {Router} = require('express');
const createUser = require('../handlers/userHandlers/createUser');
const validationCreate = require("../middleware/validationArtist/validationCreate");
const validationId = require("../middleware/validationArtist/validationIdId");
const getANameArtist = require("../handlers/artistHandlers/getANameArtist"); //get Usuario buscar por usuario y contraseña
const idUser = require("../handlers/userHandlers/idUser");
const updateArtist = require("../handlers/artistHandlers/updateArtist");
const deleteUser = require("../handlers/userHandlers/deleteUser");

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
artistRouter.get('/allArtist', getAllArtist);
artistRouter.get('/?name=artist', getANameArtist);
artistRouter.get('/:idArtist', validationId, getIdArtist);
artistRouter.put('/update/:idArtist', validationId, updateArtist);
artistRouter.delete('/delete/:idArtist', validationId, deleteArtist);









module.exports = artistRouter;