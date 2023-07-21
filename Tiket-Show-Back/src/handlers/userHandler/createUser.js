const createUser = require('../../controllers/userContollers/createUser');

module.exports = async (req, res) => {
    try {
        const {
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
        } = req.body;


        const newUser = await createUser({
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
        });
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}