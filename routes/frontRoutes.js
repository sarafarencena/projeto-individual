const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page1')
  });
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

// para testar com localhost:3000, add / o nome da rota, nesse caso, "teste"; att em 27/28 de maio para signin depois de funcionar, para ficar mais intuitivo
router.get('/signin', (req, res) => {
  res.render('signin');
  // ao invés de passar um controller, renderiza direto a view (ajuda a testar)
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page2')
  });
});

module.exports = router;

// rotas que puxam as páginas
// a rota tem o mesmo nome, nesse caso, rotas que chamam o conteúdo da página