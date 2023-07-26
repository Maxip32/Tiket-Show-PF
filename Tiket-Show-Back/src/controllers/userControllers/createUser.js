const { User } = require("../../db");

const newUser = async (
   data 
) => {
    const  {
        firstName,
        lastName,
        email,
        password,
        birthdate,
        phone,
        dni,
        isAdmin,
        google,
        image,
        state,
        confirmed
    }  = data
    console.log(data)
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        firstName,
        lastName,
        email,   
        password,
        birthdate,
        phone,
        dni,
        isAdmin,
        google,
        image,
        state,
        confirmed,
      },
    });

    await user.save();

    if (created) {
      //alert("Usuario creado con éxito"); //esto no existe mancos , en el back
    }
    return user;
  } catch (error) {
    throw new Error(error.message); //para k tiene un try catch aka si el error burbujea para arriba, lo catchea el try catch del handler
  }
};
module.exports = newUser;
