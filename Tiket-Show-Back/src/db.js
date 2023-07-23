require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ticketshow`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Artist, Event, Genre, Place,User } = sequelize.models;

Event.belongsToMany(Artist, { through: "events_artists" });
Artist.belongsToMany(Event, { through: "events_artists" });
Artist.belongsToMany(Genre, { through: "artist_genres" });
Genre.belongsToMany(Artist, { through: "artist_genres" });
Place.belongsToMany(User, { through: "place_user", as: "places" });
User.hasMany(Place, { as: "places", foreignKey: "userId" });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

// require("dotenv").config();
// const { Sequelize } = require("sequelize");
// const fs = require("fs");
// const path = require("path");
// //const Historiccart = require("./models/Historiccart");
// const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;

//  const sequelize = new Sequelize(
//    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tiketshow`,
//    {
//      logging: false, // set to console.log to see the raw SQL queries
//      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//    }
//  );

//  const basename = path.basename(__filename);

//  const modelDefiners = [];

//  //Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
//  fs.readdirSync(path.join(__dirname, "/models"))
//    .filter(
//      (file) =>
//        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//    )
//    .forEach((file) => {
//      modelDefiners.push(require(path.join(__dirname, "/models", file)));
//    });

//  //Injectamos la conexion (sequelize) a todos los modelos
//  modelDefiners.forEach((model) => model(sequelize));
//  //Capitalizamos los nombres de los modelos ie: product => Product
//  let entries = Object.entries(sequelize.models);
//  let capsEntries = entries.map((entry) => [
//    entry[0][0].toUpperCase() + entry[0].slice(1),
//    entry[1],
//  ]);
// sequelize.models = Object.fromEntries(capsEntries);

// // En sequelize.models están todos los modelos importados como propiedades
//  //Para relacionarlos hacemos un destructuring
//  const {
//    Products,
//    Category,
//    Review,
//    Cart,
//    User,
//    Productinchart,
//    Favorite,
//    Historiccart,
//    Historicproduct,
//  } = sequelize.models;

//  //Aca vendrian las relaciones
//  User.hasMany(Cart);
//  Cart.hasMany(Productinchart);
// //AGREGAR REVIEW
// User.hasMany(Review);
// Products.hasMany(Review);
// Review.belongsTo(Products);

// User.hasMany(Favorite);
// User.hasMany(Favorite);
// //ESTADISTICAS DE PRODUCTOS
// User.hasMany(Historiccart);
// Historiccart.hasMany(Historicproduct);

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
// };