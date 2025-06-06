const db = require("../config/db");

class Room {
  static async getAll() {
    const result = await db.query("SELECT * FROM rooms");
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query("SELECT * FROM rooms WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      "INSERT INTO rooms (code, name, floor, capacity) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.code, data.name, data.floor, data.capacity || 0]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      "UPDATE rooms SET code = $1, name = $2, floor = $3, capacity = $4 WHERE id = $5 RETURNING *",
      [data.code, data.name, data.floor, data.capacity || 0, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      "DELETE FROM rooms WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

  static async getByCode(code) {
    const result = await db.query("SELECT * FROM rooms WHERE code = $1", [
      code,
    ]);
    return result.rows[0];
  }
}

module.exports = Room;
