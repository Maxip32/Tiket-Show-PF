require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
//const User = require('./models/User');
//const CartItem = require('./models/cart');
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





// Agrega esta línea para importar el modelo del carrito
const CartItem = require("./models/cart");


const { Artist, Event, Genre, Place, User, City, Date } = sequelize.models;


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
