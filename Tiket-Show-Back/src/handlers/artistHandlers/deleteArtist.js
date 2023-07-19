const unsuscribArtist = require('../../controllers/artistControllers/unsuscribArtist');

module.exports = async(req, res)=>{

    const {id} = req.params;
    try {
        const deleteArtist = await unsuscribArtist(id);
        res.status(204).json(deleteArtist);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }

}