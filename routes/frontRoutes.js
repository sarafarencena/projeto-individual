const express = require('express');
const router = express.Router();
const path = require('path');
const homeController = require('../controllers/homeController');
const { ensureAuthenticated } = require('../middleware/authSessionMiddleware');

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page1')
  });
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/signin', (req, res) => {
  res.render('signin');
});

// PROTECTEDA: requires login
router.get('/home', ensureAuthenticated, homeController.showHomePage);

module.exports = router;