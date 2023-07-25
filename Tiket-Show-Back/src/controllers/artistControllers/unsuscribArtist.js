const { Artist } = require('../../db');

const unsuscribArtist = async (id) => {
    const findDelete = await Artist.findByPk(id)

    await findDelete.destroy();
   
}

module.exports = unsuscribArtist