const { Artist } = require('../../db');

const newArtist = async (
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
  confirmed,
  profileImageURL // Agrega profileImageURL como parámetro del controlador
) => {

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
    confirmed,
    profileImageURL // Guarda la URL de la imagen de perfil en la base de datos
  });

  return artist;

}

module.exports = newArtist;