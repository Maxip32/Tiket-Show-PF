const createUser = require('../../controllers/userContollers/createUser');

module.exports = async (req, res) => {
    try {
        const {
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
        } = req.body;


        const newUser = await createUser({
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
        });
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}