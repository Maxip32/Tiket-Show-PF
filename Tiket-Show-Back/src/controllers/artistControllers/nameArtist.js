const {Artist} = require("../../db");
const {Op} = require("sequelize");

module.exports = async (name)=>{
    const nameArtist = await Artist.findOne({
        where: {
            name: {
                [Op.iLike]:[`%${name}%`]}
        }
    })

    if(!nameArtist){
        console.log("El artista buscado no existe en la base de datos")
    }else{
        return nameArtist
    }
}