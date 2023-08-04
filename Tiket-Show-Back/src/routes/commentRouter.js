const {Router} = require('express');
const commentPost = require('../controllers/commentControllers/postComentController.js')
const putCommentController = require('../handlers/commentsHandler/postComment.js')

const commentsRouter = Router();

commentsRouter.post('/postComments/:email', commentPost);
commentsRouter.put('/comment/:email', putCommentController);

module.exports = commentsRouter