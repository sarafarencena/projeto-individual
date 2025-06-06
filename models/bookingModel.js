const db = require("../config/db");

class Booking {
  static async getAll() {
    const result = await db.query("SELECT * FROM bookings");
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      "INSERT INTO bookings (room_id, user_id, time_slot) VALUES ($1, $2, $3) RETURNING *",
      [data.room_id, data.user_id, data.time_slot]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      "UPDATE bookings SET room_id = $1, user_id = $2, time_slot = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [data.room_id, data.user_id, data.time_slot, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      "DELETE FROM bookings WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  static async getByUserRoomTime(userId, roomId, timeSlot) {
    const result = await db.query(
      "SELECT * FROM bookings WHERE user_id = $1 AND room_id = $2 AND time_slot = $3",
      [userId, roomId, timeSlot]
    );
    return result.rows[0];
  }
  
  static async getBookingsByUser(userId) {
    const result = await db.query(
      "SELECT b.*, r.code as room_code FROM bookings b JOIN rooms r ON b.room_id = r.id WHERE b.user_id = $1",
      [userId]
    );
    return result.rows;
  }
}

module.exports = Booking;
