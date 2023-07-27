// models/User.js
const { DataTypes } = require('sequelize');
//const CartItem = require('./cart');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      //allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      //allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
     // allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    google: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      //allowNull: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: { type: DataTypes.STRING },

      disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  // Definir las asociaciones
 //User.hasMany(sequelize.model.CartItem, { foreignKey: 'user_id', as: 'cart_item' });

  return User;
};
