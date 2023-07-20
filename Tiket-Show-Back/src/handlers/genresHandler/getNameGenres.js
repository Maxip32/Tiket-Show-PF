const getName = require('../../controllers/genresControllers/nameGenres');

module.exports = async(req, res)=>{
    const {name} = req.query;
    try {
        const genresName = await getName(name);
        res.status(200).json(genresName);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}