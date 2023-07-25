const { User } = require("../../db");
const Mailer = require('./Mailer'); // Ajusta la ruta según la ubicación de Mailer.js


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

        const subject = 'Registro Exitoso';
     
        const content = '¡Bienvenido! Tu registro ha sido exitoso.';
        
        Mailer.sendEmail(subject, email, firstName, content);
  
        // Mostrar un mensaje al usuario (puedes adaptarlo según tu frontend)
        console.log('Usuario creado con éxito');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
module.exports = newUser;
