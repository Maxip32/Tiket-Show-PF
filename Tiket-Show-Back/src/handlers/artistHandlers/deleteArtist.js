const unsuscribArtist = require('../../controllers/artistControllers/unsuscribArtist');

 const deleteArtist = async(req, res)=>{

    const {id} = req.params;
    try {
        await unsuscribArtist(id);
       res.status(204).json({msg: 'Artista borrado con éxito'});
    } catch (error) {
        res.status(404).json({msg: error.message});
    }

}

module.exports = deleteArtist