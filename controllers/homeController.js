const supabase = require('../config/supabase');
const db = require('../config/db');

const homeController = {
    async getBookingsForGrid(currentUserId) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*, rooms(code)')
                .order('created_at');
            
            if (error) throw error;
            
            const bookings = {};
            data.forEach(booking => {
                const roomCode = booking.rooms?.code;
                if (roomCode) {
                    const key = `${roomCode}-${booking.time_slot}`;
                    bookings[key] = {
                        booked: true,
                        bookedByUser: booking.user_id === currentUserId
                    };
                }
            });
            
            return bookings;
        } catch (error) {
            console.error('Erro ao buscar reservas:', error);
            return {};
        }
    },

    async showHomePage(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/signin');
            }

            const { rows: rooms } = await db.query('SELECT code FROM rooms ORDER BY code');
            const roomCodes = rooms.map(room => room.code);

            const bookings = await homeController.getBookingsForGrid(userId);
            res.render('home', {
                bookings: bookings,
                roomCodes: roomCodes,
                pageTitle: 'Sistema de Reservas',
                currentUserId: userId
            });
        } catch (error) {
            console.error('Erro ao carregar página home:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }
};

module.exports = homeController;