const db = require('../config/db');

class Booking {
  static async getAll() {
    const result = await db.query('SELECT * FROM bookings');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO bookings (id_user, id_room, time) VALUES ($1, $2, $3) RETURNING *',
      [data.id_user, data.id_room, data.time]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE bookings SET id_user = $1, id_room = $2, time = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [data.id_user, data.id_room, data.time, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Booking;
