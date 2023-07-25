const { User } = require("../../db");

const idUser = async (id)=>{
    const users = await User.findOne({
        where:{
            id: id,
        }
    });
    console.log(users);

        return users;
}
module.exports = idUser