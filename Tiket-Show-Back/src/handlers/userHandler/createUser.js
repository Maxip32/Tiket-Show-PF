const newUser = require("../../controllers/userControllers/createUser");

const createUser = async (req, res) => {
  try {
    const {
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
      profileImageURL,
    } = req.body;

    const theUser = await newUser({
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
      profileImageURL,
    });

    res.status(201).json(theUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = createUser;
