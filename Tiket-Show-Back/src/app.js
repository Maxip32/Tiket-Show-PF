const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors'); // Agrega la importación de cors
//const routes = require('./routes/index.js');
const artistRouter = require('./routes/artistRouter');
const event = require ('./routes/eventRouter')
const genrestRouter = require ('./routes/genrestRouter')
const placetRouter = require ('./routes/placeRouter')
const cartRouter = require ('./routes/cartRoutes')
const findCityRoute = require ('./routes/cityRouter');
const dateRouter = require('./routes/dateRouter');
const nodemailerRouter = require("./routes/nodemailerRouter")
const userRouter = require('./routes/userRouter');
const paymentRoutes = require('./routes/paymentRoutes')
const path = require ('path')



require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configura cors como middleware
server.use(cors());

// Rutas y middlewares restantes...
server.use('/artist', artistRouter);
server.use('/genres', genrestRouter)
server.use('/event', event);
server.use('/place', placetRouter);
server.use('/cart', cartRouter);
server.use('/city', findCityRoute);
server.use('/date', dateRouter)
server.use('/user', userRouter)
server.use("/send",nodemailerRouter)
server.use(paymentRoutes)
server.use(express.static(path.resolve(__dirname, 'Ticket-Show-Front/src/Views/Detail')))


server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
