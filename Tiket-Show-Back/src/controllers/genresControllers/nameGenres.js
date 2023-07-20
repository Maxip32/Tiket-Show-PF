const {Genre} = require('../../db');
const {Op} = require('sequelize');

module.exports = async(name)=>{
    const getGenre = await Genre.findOne({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            }
        }
    })
    return getGenre;
}