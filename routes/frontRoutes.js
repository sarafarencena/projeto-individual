const express = require('express');
const router = express.Router();
const path = require('path');
const homeController = require('../controllers/homeController');
const { ensureAuthenticated } = require('../middleware/authSessionMiddleware');

router.get('/', (req, res) => {
  res.render('signin', {
    pageTitle: 'Login'
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    pageTitle: 'Criar Conta'
  });
});

router.get('/signin', (req, res) => {
  res.render('signin', {
    pageTitle: 'Login'
  });
});

router.get('/home', ensureAuthenticated, homeController.showHomePage);

module.exports = router;