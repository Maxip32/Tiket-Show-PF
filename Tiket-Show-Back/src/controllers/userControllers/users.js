const { idArtist } = require("../../db");
const idArtist = require("../userControllers/users");

module.exports = async (id)=>{
    const idUsers = await idUsers.findOne({
        where:{
            id: id,
        }
    });

    if(!idUsers){
        return("No existe un Artista con este id");
    }else{
        return('Artista encontrado con éxito');
    }
}