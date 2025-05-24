const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/signout', authController.signOut);
router.get('/user', authController.getCurrentUser);
router.post('/refresh', authController.refreshToken);
module.exports = router;