const {Genre} = require('../../db');


module.exports = async()=>{
    const findGenre = await Genre.findAll()
    return findGenre
}