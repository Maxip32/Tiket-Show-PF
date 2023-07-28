const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('artist', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        spotify: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        google: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        profileImageURL: { // Nuevo campo para almacenar la URL de la imagen de perfil
            type: DataTypes.STRING,
            allowNull: true,
          },

        role: { type: DataTypes.STRING, defaultValue: "artista" },

        disabled: { type: DataTypes.BOOLEAN, defaultValue: false },

    });
};

