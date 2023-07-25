const newArtist = require('../../controllers/artistControllers/createArtist')

 const createArtist = async (req, res) => {
    try {
        const {
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
            confirmed
        } = req.body;

console.log(req.body);
        const theArtist = await newArtist(
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
            confirmed
        );
        res.status(201).json(theArtist)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = createArtist