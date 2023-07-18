const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const artistRoute = require('./artistRoute.js')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/Artist', Artist);


module.exports = router;
