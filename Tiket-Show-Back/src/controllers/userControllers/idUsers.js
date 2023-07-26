const { User } = require("../../db");
// const idArtist = require("../userControllers/users");

module.exports = async ()=>{
    const idUsers = await User.findAll(
     
    );
console.log(idUsers)
    if(!idUsers){
        alert("No existe un Usuario con este id");
    }else{
        alert('Usuario encontrado con éxito');
        return idUsers;
    }
}
