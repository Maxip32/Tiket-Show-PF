const {User} = require("../../db");
const {Op} = require("sequelize");

module.exports = async (name)=>{
    const nameUser = await User.findOne({
        where: {
            firstName: {
                [Op.iLike]:[`%${name}%`]}
        }
    })

    if(nameUser){
        console.log("El usuario ya existe en la base de datos")
    }else{
        return console.log("Usuario creado con exito")
    }
}