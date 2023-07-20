const { Router } = require('express');
const genrestRouter = require("./artistRoutes/artistRouter")
const eventRouter = require('./eventRouter')

const router = Router();

router.use('/artist', artistRouter)
router.use('/genres', genrestRouter)
router.use('/event',eventRouter)

module.exports = router;