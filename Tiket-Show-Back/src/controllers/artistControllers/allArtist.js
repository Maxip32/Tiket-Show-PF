const {Artist} = require('../../db.js');

/*module.exports = async ()=>{
    try {
        const artist = await Artist.findAll();
        return artist
    } catch (error) {
        throw new Error(error.message);        
    }

}*/

const allArtist = async (req, res = response) => {

    try {
        const artists = await Artist.findAll({
            where: { state: true },
        });

        if (!artists) {
            return res.status(404).json();
        }
        res.status(200).json({ artists });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

module.exports = {
    allArtist
};