const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.getAll();
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await Booking.getById(req.params.id);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createBooking: async (req, res) => {
        try {
            // Valida se o usuário está autenticado
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            // Adiciona o userId da sessão ao body
            const bookingData = {
                ...req.body,
                user_id: userId
            };

            const booking = await Booking.create(bookingData);
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const userId = req.session.userId;
            
            // Verifica se a reserva pertence ao usuário
            const existingBooking = await Booking.getById(req.params.id);
            if (!existingBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            
            if (existingBooking.user_id !== userId) {
                return res.status(403).json({ error: 'Não autorizado' });
            }

            const booking = await Booking.update(req.params.id, req.body);
            res.json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const userId = req.session.userId;
            
            // Verifica se a reserva pertence ao usuário
            const existingBooking = await Booking.getById(req.params.id);
            if (!existingBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            
            if (existingBooking.user_id !== userId) {
                return res.status(403).json({ error: 'Não autorizado' });
            }

            await Booking.delete(req.params.id);
            res.json({ message: 'Booking deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Nova função para buscar reserva específica
    getBookingByUserRoomTime: async (req, res) => {
        try {
            const { userId, roomCode, timeSlot } = req.params;
            const sessionUserId = req.session.userId;
            
            // Verifica se o usuário pode acessar esta reserva
            if (userId !== sessionUserId) {
                return res.status(403).json({ error: 'Não autorizado' });
            }

            // Busca a sala pelo código
            const room = await Room.getByCode(roomCode);
            if (!room) {
                return res.status(404).json({ error: 'Sala não encontrada' });
            }

            // Busca a reserva
            const booking = await Booking.getByUserRoomTime(userId, room.id, timeSlot);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            res.json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Rota para obter todas as reservas do usuário atual
    getUserBookings: async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const bookings = await Booking.getBookingsByUser(userId);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = bookingController;
