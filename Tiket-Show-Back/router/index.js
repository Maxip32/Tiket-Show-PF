const { Router } = require('express');
const artistRouter = require("./artistRoutes/artistRouter")

const router = Router();

router.use('/artist', artistRouter)

module.exports = router;