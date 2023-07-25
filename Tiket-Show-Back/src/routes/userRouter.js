const { Router } = require("express");
const createUser = require("../handlers/userHandler/createUser");
const getIdUser = require("../handlers/userHandler/idUser");
const deleteUser = require("../handlers/userHandler/unsuscribUser");

// const validationCreate = require("../middleware/validationArtist/validationCreate");
// const validationId = require("../middleware/validationArtist/validationIdId");
// const getAllArtist = require("../handlers/artistHandlers/getAllArtist");
// const getANameArtist = require("../handlers/artistHandlers/getANameArtist");
// const idUser = require("../handlers/userHandlers/idUser");
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

userRouter.post("/createUser", createUser);
userRouter.get("/id/:id", getIdUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
