const {Artist} = require('../../db');

module.exports = async ()=>{
    try {
        const artist = await Artist.findAll();
        return artist
    } catch (error) {
        throw new Error(error.message);        
    }

}