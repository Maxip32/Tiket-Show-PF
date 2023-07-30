const {Router} = require('express');
const createUserData = require('../handlers/userHandler/createUser');
// const validationCreate = require("../middleware/validationArtist/validationCreate");
// const validationId = require("../middleware/validationArtist/validationIdId");
// const getAllArtist = require("../handlers/artistHandlers/getAllArtist");
// const getANameArtist = require("../handlers/artistHandlers/getANameArtist");
const idUser = require("../handlers/userHandler/idUser");
// // const updateArtist = require("../handlers/artistHandlers/updateArtist");
// const deleteUser = require("../handlers/userHandlers/deleteUser");

const userRouter = Router();

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
userRouter.post('/createUser',createUserData);
userRouter.get('/', idUser);
// artistRouter.post('/createArtist', validationCreate, createArtist);
// artistRouter.get('/allArtist', getAllArtist);
// artistRouter.get('/?name=artist', getANameArtist);
// artistRouter.get('/:idArtist', validationId, getIdArtist);
// artistRouter.put('/update/:idArtist', validationId, updateArtist);
// artistRouter.delete('/delete/:idArtist', validationId, deleteArtist);









module.exports = userRouter;