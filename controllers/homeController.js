// controllers/homeController.js
const supabase = require('../config/supabase');

const homeController = {
    async getBookingsForGrid(currentUserId) {
    try {
        const { data, error } = await supabase
            .from('bookings')
            .select('*');
        
        if (error) throw error;
        
        const bookings = {};
        data.forEach(booking => {
            const key = `${booking.room_id}-${booking.time_slot}`;
            bookings[key] = {
                booked: true,
                bookedByUser: booking.user_id === currentUserId
            };
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
            return res.redirect('/signin'); // Redirects who is not logged in
        }

        const bookings = await homeController.getBookingsForGrid(userId);

        res.render('home', { 
            bookings: bookings,
            pageTitle: 'Sistema de Reservas'
        });
    } catch (error) {
        console.error('Erro ao carregar página home:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

};

module.exports = homeController;