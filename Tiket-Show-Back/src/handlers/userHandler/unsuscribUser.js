const unsuscribUser = require('../../controllers/userControllers/unsuscribUser');

const deleteUser = async (req, res)=>{

    const {id} = req.params;
    try {
        await unsuscribUser(id);
        res.status(204).json({msg: 'El usuario fue borrado con éxito'});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}
module.exports = deleteUser