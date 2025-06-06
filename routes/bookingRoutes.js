const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuthenticated } = require('../middleware/authSessionMiddleware');

// Aplica middleware de autenticação a todas as rotas
router.use(ensureAuthenticated);

router.get('/', bookingController.getAllBookings);
router.get('/user/me', bookingController.getUserBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

// Novas rotas específicas
router.get('/user/:userId/room/:roomCode/time/:timeSlot', bookingController.getBookingByUserRoomTime);

module.exports = router;
