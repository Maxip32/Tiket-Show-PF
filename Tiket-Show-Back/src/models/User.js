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
<<<<<<< HEAD
      allowNull: true,
=======
      //allowNull: false,
>>>>>>> 5d18d40911448e35e915af86714016cf71fd1bf2
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
<<<<<<< HEAD
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true,
=======
      //allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      //allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      //allowNull: true,
    },
    dni: {
      type: DataTypes.STRING,
      //allowNull: false,
>>>>>>> 5d18d40911448e35e915af86714016cf71fd1bf2
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
    role: { type: DataTypes.STRING, defaultValue: "customer" },

      disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  // Definir las asociaciones
 //User.hasMany(sequelize.model.CartItem, { foreignKey: 'user_id', as: 'cart_item' });

  return User;
};
