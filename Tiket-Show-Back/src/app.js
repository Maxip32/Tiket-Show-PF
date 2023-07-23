const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const cors = require('cors'); // Agrega la importación de cors
//const routes = require('./routes/index.js');
const event = require('./routes/eventRouter');
=======
const artistRouter = require('./routes/artistRouter');
const event = require ('./routes/eventRouter')
const genrestRouter = require ('./routes/genrestRouter')
const placetRouter = require ('./routes/placeRouter')
>>>>>>> 060682a6313fb6325b56055c9a49b2cb99465b5d

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

<<<<<<< HEAD
// Configura cors como middleware
server.use(cors());

// Rutas y middlewares restantes...
=======
server.use('/artist', artistRouter);
server.use('/genres', genrestRouter)
>>>>>>> 060682a6313fb6325b56055c9a49b2cb99465b5d
server.use('/event', event);
server.use('/place', placetRouter);

server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
