const idUser = require("../../controllers/userControllers/idUsers");

const getIdUser = async(req, res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const getUsersById = await idUser(id);
        res.status(200).json(getUsersById);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = getIdUser
