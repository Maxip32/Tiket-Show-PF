const { Router } = require('express')
const getUsersById = require("../handlers/userHandler/getUsersById")
const UserRouter = Router();

UserRouter.get("/:idUser", getUsersById)

module.exports = UserRouter;