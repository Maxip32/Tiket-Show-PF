const { User } = require("../../db");
const Mailer = require("./Mailer"); // Ajusta la ruta según la ubicación de Mailer.js
const { uploadImage } = require("../../cloudinary/uploadImage");


const newUser = async (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    birthdate,
    phone,
    dni,
    isAdmin,
    google,
    state,
    confirmed,
  } = data;
  console.log(data);


  // Carga la imagen en Cloudinary y obtiene la URL de la imagen de perfil
  let profileImageURL = null;
  if (image) {
    profileImageURL = await uploadImage(image); // Ajusta la forma en que se pasa la imagen a la función si es necesario
  }

 HEAD
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
      birthdate,
      phone,
      dni,
      isAdmin,
      google,
      image,
      state,
      confirmed,
      profileImageURL, // Asigna la URL de la imagen de perfil al campo profileImageURL
    },
  });

  await user.save();

  if (created) {
    const subject = "Registro Exitoso";

    const content = "¡Bienvenido! Tu registro ha sido exitoso.";

    Mailer.sendEmail(subject, email, firstName, content);

    // Mostrar un mensaje al usuario (puedes adaptarlo según tu frontend)
    console.log("Usuario creado con éxito");
  }
  return user;
}
module.exports = newUser;
