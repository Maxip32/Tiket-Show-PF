const { User } = require('../../db');

 const changeUser = async (email, body = null, stars = null) => {

        const updateUser = await User.findAll(email);

        if(!updateUser){
            return 'usuario no encontrado';
        }
    
        if(body){
            updateUser.body = body;
        }
       
        if(stars){
            updateUser.stars = stars;
        }

        await updateUser.save();

        return updateUser;

    } 
    
    module.exports = changeUser