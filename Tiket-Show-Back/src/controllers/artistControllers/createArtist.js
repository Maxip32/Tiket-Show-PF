const { Artist } = require('../../db');

const newArtist = async(
    firstName,
    lastName,
    nickname,
    email,
    password,
    phone,
    description,
    twitter,
    instagram,
    spotify,
    image,
    google,
    state,
    confirmed
)=>{
    
    const artist = await Artist.create({
            firstName,
            lastName,
            nickname,
            email,
            password,
            phone,
            description,
            twitter,
            instagram,
            spotify,
            image,
            google,
            state,
            confirmed
        
    })


return artist;
  
}

module.exports = newArtist

