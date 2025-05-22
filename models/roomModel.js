const db = require('../config/db');

class Room {
  static async getAll() {
    const result = await db.query('SELECT * FROM rooms');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM rooms WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO rooms (id_user, name, floor) VALUES ($1, $2, $3) RETURNING *',
      [data.id_user, data.name, data.floor]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE rooms SET id_user = $1, name = $2, floor = $3 WHERE id = $4 RETURNING *',
      [data.id_user, data.name, data.floor, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Room;
