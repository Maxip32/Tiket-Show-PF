const nameArtist = require("../../controllers/artistControllers/nameArtist");

module.exports = async()=>{
    try {
        const {name} = req.query;
        const getName = await nameArtist(name);
        resizeBy.status(200).json(getName);
    } catch (error) {
        resizeBy.status(400).json({msg: error.message});
    }
}