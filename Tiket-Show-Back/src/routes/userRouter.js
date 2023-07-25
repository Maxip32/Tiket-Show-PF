const {Router} = require('express');
const createUser = require("../handlers/userHandler/createUser");
const getIdUser = require("../handlers/userHandler/idUser");
const deleteUser = require("../handlers/userHandler/unsuscribUser");

const userRouter = Router();


userRouter.post('/createUser', createUser);
userRouter.get('/id/:id', getIdUser);
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;