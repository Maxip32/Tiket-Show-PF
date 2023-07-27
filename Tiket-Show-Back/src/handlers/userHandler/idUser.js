//const idUser = require("../../controllers/userControllers/idUsers");
const { User } = require("../../db");
module.exports = async(req, res)=>{

    const idUsers = await User.findAll(
     
        );
    console.log(idUsers)
        if(!idUsers){
            alert("No existe un Usuario con este id");
        }else{
            //alert('Usuario encontrado con éxito');
            await res.status(200).json(idUsers);
           
        }
    // console.log(idUser, " user del back")
    // try {
    //     //const getUsersById = await idUser(userId);
    //    await res.status(200).json(idUser);
    // } catch (error) {
    //     res.status(400).json({msg: error.message});
    // }
}
