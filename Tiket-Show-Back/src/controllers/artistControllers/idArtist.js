const {Artist} = require("../../db");

module.exports = async (id)=>{
    const idArtist = await Artist.findOne({
        where:{
            id: id,
        }
    });

    if(!idArtist){
        console.log("No existe un Artista con este id");
    }else{
        console.log('Artista encontrado con éxito');
        return idArtist
    }
}