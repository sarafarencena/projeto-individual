require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const db = require('./config/db');
const app = express();

app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret', // secure environment variable
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', // requires HTTPS in production only
    httpOnly: true, // avoid access to cookie via JS
    sameSite: 'strict' // token to avoid CSRF
  }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(express.json());

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // app.use(express.json());

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const authRoutes = require('./routes/authRoutes');
    app.use('/auth', authRoutes);

    const roomRoutes = require('./routes/roomRoutes');
    app.use('/rooms', roomRoutes);

    const bookingRoutes = require('./routes/bookingRoutes');
    app.use('/bookings', bookingRoutes);

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware to deal with errors of not founded routes
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware to deal with server internal errors
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
