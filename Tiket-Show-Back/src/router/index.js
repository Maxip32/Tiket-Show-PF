const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getUserRouter = require("./getUsersRoute")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/artist', Artist);
router.use('/user', getUserRouter);

module.exports = router;
