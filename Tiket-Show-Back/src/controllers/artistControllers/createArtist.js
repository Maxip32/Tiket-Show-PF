const { Artist } = require('../../db');

const newArtist = async(
    firstName,
    lastName,
    nickName,
    email,
    password,
    phone,
    decription,
    twitter,
    instagram,
    spotify,
    image,
    google,
    state,
    confirmed
)=>{
    try {
    const [artist, created] = await Artist.findOrCreate({
        where:{
            firstName,
            lastName,
            nickName,
        },
        create:{
            firstName,
            lastName,
            nickName,
            email,
            password,
            phone,
            decription,
            twitter,
            instagram,
            spotify,
            image,
            google,
            state,
            confirmed
        }
    })

    await artist.save();

    if(created){
    console.log('Artista creado con éxito')
    }

    return artist;
} catch (error) {
    throw new Error(error.message)
}
}

module.exports = newArtist