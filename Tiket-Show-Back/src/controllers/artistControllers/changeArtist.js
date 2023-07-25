const { Artist } = require('../../db');

 const changeArtist = async (id, firstName = null, lastName = null, nickname = null, email = null, password = null, phone = null, decription = null) => {

        const updateArtist = await Artist.findByPk(id);

        if(!updateArtist){
            return 'usuario no encontrado';
        }
    
        if(firstName){
            updateArtist.firstName = firstName;
        }
        if(lastName){
            updateArtist.lastName = lastName;
        }
        if(nickname){
            updateArtist.nickname = nickname;
        }
        if(email){
            updateArtist.email = email;
        }
        if(password){
            updateArtist.password = password;
        }
        if(phone){
            updateArtist.phone = phone;
        }
        if(decription){
            updateArtist.decription = decription;
        }

        await updateArtist.save();

        return updateArtist;

    } 
    
    module.exports = changeArtist