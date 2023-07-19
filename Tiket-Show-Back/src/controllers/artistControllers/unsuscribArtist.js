const {Artist} = require('../../db');

module.exports = async (id)=>{
    const findArtist = await Artist.findByPk(id);
    const deleteArtist = await findArtist.destroy();

    return deleteArtist;
}