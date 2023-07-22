const { User } = require('../../db');

module.exports = async(
    firstName,
    lastName,
    email,
    password,
    birthDate,
    phone,
    dni,
    isAdmin,
    google,
    image,
    state,
    confirmed
)=>{
    try {
    const [user, created] = await User.findOrCreate({
        where:{
            firstName,
            lastName,
            email,
        },
        create:{
            firstName,
            lastName,
            email,
            password,
            birthDate,
            phone,
            dni,
            isAdmin,
            google,
            image,
            state,
            confirmed
        }
    })

    await user.save();

    if(created){
    alert('Usuario creado con éxito')
    }
    return user;
} catch (error) {
    throw new Error(error.message)
}
}