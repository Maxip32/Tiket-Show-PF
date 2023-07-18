const allArtist = require("../../controllers/artistControllers/allArtist");

module.exports = async (req, res)=>{
    try {
        const getArtists = await allArtist();
        res.status(200).json(getArtists);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}