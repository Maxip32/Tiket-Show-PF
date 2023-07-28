// const { User } = require('../../db');

// module.exports = async(
//     firstName,
//     lastName,
//     email,
//     password,
//     birthDate,
//     phone,
//     dni,
//     isAdmin,
//     google,
//     image,
//     state,
//     confirmed
// )=>{
//     try {
//     const [user, created] = await User.findOrCreate({
//         where:{
//             firstName,
//             lastName,
//             email,
//         },
//         create:{
//             password,
//             birthDate,
//             phone,
//             dni,
//             isAdmin,
//             google,
//             image,
//             state,
//             confirmed
//         }
//     })

//     await user.save();

//     if(created){
//     alert('Usuario creado con éxito')
//     }
//     return user;
// } catch (error) {
//     throw new Error(error.message)
// }
// }

const { User } = require("../../db");

const newUser = async (
   data 
) => {
    const  {
        firstName,
        lastName,
        email,
        password,
        birthday,
        phone,
        dni,
        isAdmin,
        google,
        image,
        state,
        confirmed
    }  = data
    console.log(data)
  
    const [user, created] = await User.findOrCreate({

      where: {
        email,
      },
      defaults: {
        firstName,
        lastName,
        email,   
        password,
        birthday,
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

    return user;
};
module.exports = newUser;