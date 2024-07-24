const express  = require('express');
const mongoose = require('mongoose');

/* Middlewares */
const { isAuthenticated } = require('../middleware/isAuthenticated');

/* Controllers */
const { registerController }                  = require('../controllers/registerController');
const { loginController }                     = require('../controllers/loginController');
const { requestVerifyAccountEmailController } = require('../controllers/requestVerifyAccountEmailController');
const { verifyAccountController }             = require('../controllers/verifyAccountController');
const { sendPasswordResetEmailController }    = require('../controllers/sendPasswordResetEmailController');
const { resetPasswordController }             = require('../controllers/resetPasswordController');
const { updateUserInfoController }            = require('../controllers/updateUserInfoController');
const { deleteUserController }                = require('../controllers/deleteUserController');
const { createNewPostController }             = require('../controllers/createNewPostController');
const { getUsersPostsController }             = require('../controllers/getUsersPostsController');
const { likePostController }                  = require('../controllers/likePostController');
const { createNewCommentController }          = require('../controllers/createNewCommentController');
const { deletePostController }                = require('../controllers/deletePostController');
const { unlikePostController }                = require('../controllers/unlikePostController');
const { deleteCommentController }             = require('../controllers/deleteCommentController');
const { forYouFeedController }                = require('../controllers/forYouFeedController');
const { discoverFeedController }              = require('../controllers/discoverFeedController');
const { followUserController }                = require('../controllers/followUserController');
const { unfollowUserController }              = require('../controllers/unfollowUserController');
const { getFollowersController }              = require('../controllers/getFollowersController');
const { getFollowingController }              = require('../controllers/getFollowingController');
const { getUserController }                   = require('../controllers/getUserController');

/* Validators */
const { validateRegister }                   = require('../validators/registerValidator');
const { loginValidator }                     = require('../validators/loginValidator'); 
const { requestVerifyAccountEmailValidator } = require('../validators/requestVerifyAccountEmailValidator');
const { sendPasswordResetEmailValidator }    = require('../validators/sendPasswordResetEmailValidator');
const { resetPasswordValidator }             = require('../validators/resetPasswordValidator');
const { updateUserInfoValidator }            = require('../validators/updateUserInfoValidator');
const { createNewPostValidator }             = require('../validators/createNewPostValidator');
const { createNewCommentValidator }          = require('../validators/createNewCommentValidator');



const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));

/* Auth Routes */
router.post('/register', validateRegister, registerController);
router.post('/login', loginValidator, loginController);
router.post('/send-verify-email', requestVerifyAccountEmailValidator, requestVerifyAccountEmailController);
router.get('/verify-account', verifyAccountController);
router.post('/send-password-reset-email', sendPasswordResetEmailValidator, sendPasswordResetEmailController)
router.post('/reset-password', resetPasswordValidator, resetPasswordController);

/* User Routes */
router.patch('/user/update/:userId', updateUserInfoValidator, updateUserInfoController);
router.delete('/user/delete/:userId', isAuthenticated, deleteUserController);
router.get('/user/:userId/posts', isAuthenticated, getUsersPostsController);
router.get('/for-you-feed', isAuthenticated, forYouFeedController);
router.get('/discover-feed', isAuthenticated, discoverFeedController);
router.post('/users/follow/:userId', isAuthenticated, followUserController);
router.delete('/users/unfollow/:userId', isAuthenticated, unfollowUserController);
router.get('/users/:userId/followers', isAuthenticated, getFollowersController);
router.get('/users/:userId/following', isAuthenticated, getFollowingController);
router.get('/user', isAuthenticated, getUserController);

/* Post Routes */
router.post('/post', isAuthenticated, createNewPostValidator, createNewPostController);
router.post('/posts/:postId/like', isAuthenticated, likePostController);
router.post('/posts/:postId/comment', isAuthenticated, createNewCommentValidator, createNewCommentController);
router.delete('/posts/:postId/delete', isAuthenticated, deletePostController);
router.delete('/posts/:postId/unlike', isAuthenticated, unlikePostController);
router.delete('/posts/:postId/comments/:commentId/delete', isAuthenticated, deleteCommentController);

module.exports = { router };