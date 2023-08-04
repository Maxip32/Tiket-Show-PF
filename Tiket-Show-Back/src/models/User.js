// models/user.js
const { DataTypes } = require('sequelize');
const CartItem = require('./cart');
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
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
  date: {
      type: DataTypes.STRING,
      allowNull: true
  },
  stars: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  });

//  
  return User;
};
