const Booking = require('../models/bookingModel');

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
      const booking = await Booking.create(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const booking = await Booking.update(req.params.id, req.body);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.delete(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookingController;
