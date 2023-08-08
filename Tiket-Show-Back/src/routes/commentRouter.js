const {Router} = require('express');
//const commentPost = require('../controllers/commentControllers/postComentController.js')
const putCommentController = require('../handlers/commentsHandler/postComment.js')
//const createCommentAndAssociateUser = require('../controllers/userControllers/findUser.js')

const commentsRouter = Router();

//commentsRouter.post('/postComments/:email', commentPost);
commentsRouter.put('/comment/:email', putCommentController);
//commentsRouter.get('/comment/new/:email', createCommentAndAssociateUser);

module.exports = commentsRouter