const idUser = require("../../controllers/userControllers/users");

module.exports = async(req, res)=>{
    const {id} = req.params;
    try {
        const getUsersById = await idUser(id);
        res.status(200).json(getUsersById);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}