const { Router } = require('express');
const genrestRouter = require("./artistRoutes/artistRouter")

const router = Router();

router.use('/artist', artistRouter)
router.use('/genres', genrestRouter)

module.exports = router;