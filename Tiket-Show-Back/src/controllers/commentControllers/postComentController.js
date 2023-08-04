const Comment = require('../../db');
const User = require('../../db')

const commentPost = ()=>{

const commentControllerPost = async( body, date, stars, email)=>
{
    const [commentPost, comment] = await Comment.findOrCreate({
        where: {email},
        defaults:{
            body,
            date,
            stars
        }
    })

    const idUser = await User.findAll({
        where: {email}
    })

    await commentPost.addUser(idUser);

    const commentPostDB = await Comment.findOne({
        where:{
            email: commentPost.email
        },
        include: [{
            model: User,
            attributes: ['email'],
            through: {
                attributes: []
            }
        }]
    })

    // let newCommentPost = {
    //     body: commentPostDB.body, 
    //     date: commentPostDB.date, 
    //     stars: commentPostDB.stars 

    // }
    return commentPostDB;
}

async(req, res)=>{
    const {email} = req.params
    const {body, date, stars} = req.body
    try {
        const commentRes = await commentControllerPost(email, body, date, stars);
        res.status(201).json(commentRes);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

}
module.exports = commentPost;