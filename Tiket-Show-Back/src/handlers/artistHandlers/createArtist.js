const createArtist = require('../../controllers/artistControllers/createArtist')

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


        const newArtist = await createArtist({
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
        res.status(201).json(newArtist)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}