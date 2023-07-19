const { User } = require("../../db");
// const idArtist = require("../userControllers/users");

module.exports = async (id)=>{
    const idUsers = await User.findOne({
        where:{
            id: id,
        }
    });

    if(!idUsers){
        alert("No existe un Usuario con este id");
    }else{
        alert('Usuario encontrado con éxito');
        return idUsers;
    }
}