const Room = require('../models/roomModel');

const roomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.getAll();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const room = await Room.getById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRoom: async (req, res) => {
    try {
      const room = await Room.create(req.body);
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const room = await Room.update(req.params.id, req.body);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const room = await Room.delete(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRoomByCode: async (req, res) => {
    try {
        const room = await Room.getByCode(req.params.code);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = roomController;
