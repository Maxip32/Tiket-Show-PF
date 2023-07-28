const {Router} = require('express');
const validationCreate = require("../middleware/validationArtist/validationCreate");
const validationId = require("../middleware/validationArtist/validationIdId");
const getANameArtist = require("../handlers/artistHandlers/getANameArtist"); //get Usuario buscar por usuario y contraseña
const updateArtist = require("../handlers/artistHandlers/updateArtist");
const createUser = require("../handlers/userHandler/createUser");
const getIdUser = require("../handlers/userHandler/idUser");
const deleteUser = require("../handlers/userHandler/unsuscribUser");


const userRouter = Router();


userRouter.post('/createUser', createUser);
userRouter.get('/id/:id', getIdUser);
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;