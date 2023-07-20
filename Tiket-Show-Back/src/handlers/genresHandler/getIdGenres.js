const getId = require('../../controllers/genresControllers/idGenres');

module.exports = async (req, res)=>{
    const {id} = req.params;
    try {
        const idGenre = await getId(id);
        res.status(200).json(idGenre);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}