const {Genre} = require('../../db');

module.exports = async(id)=>{
    const idGenre = await Genre.finOne({
        where: {
            id: id,
        }
    });
    return idGenre;
}