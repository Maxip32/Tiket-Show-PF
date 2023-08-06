const changeUser = require('../../controllers/userControllers/addComment');

 const getComment = async  (req, res)=> {
    const {id} = req.params 
    const {body, stars} = req.body

    try {
        const updatetomments = await changeUser(id, body, stars);
        res.status(200).json(updatetomments);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

module.exports = getComment