const {User} = require('../../db');

const unsuscribUser = async (id)=>{
     await User.destroy({
        where:{
            id: id}
    });
}
module.exports = unsuscribUser