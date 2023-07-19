const idArtist = require("../../controllers/handlers/getUsersByArtist");

module.exports = async(req, res)=>{
    const {id} = req.params;
    try {
        const getUsersByName = await idArtist(id);
        res.status(200).json(getUsersByName);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}