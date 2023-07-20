const getGenres = require('../../controllers/genresControllers/allGenres');

module.exports = async (req, res)=>{
    try {
const allGenres = await getGenres();
res.status(200).json(allGenres)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}