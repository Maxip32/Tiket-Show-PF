const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parent: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        stars: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    },
        {
            timestamps: false,
        }
    );
};