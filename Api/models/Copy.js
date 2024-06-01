import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Copy {
    constructor(id, book_id, status, created_at) {
        this.id = id;
        this.book_id = book_id;
        this.status = status;
        this.created_at = created_at;
    }

    static async getAllCopies() {
        const sql = 'SELECT * FROM copies';
        const rows = await db.query(sql);
        return rows;
    }

    static async getCopyById(id) {
        const sql = 'SELECT * FROM copies WHERE id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];  // Return a single copy
    }

    static async addCopy(copy) {
        const sql = 'INSERT INTO copies (book_id, status) VALUES (?, ?)';
        const result = await db.query(sql, [copy.book_id, copy.status]);
        return result.insertId;  // Return the ID of the inserted copy
    }

    static async updateCopy(id, copy) {
        const sql = 'UPDATE copies SET book_id = ?, status = ? WHERE id = ?';
        const result = await db.query(sql, [copy.book_id, copy.status, id]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async deleteCopy(id) {
        const sql = 'DELETE FROM copies WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }


    static async getAvailableCopies(bookId) {
        const sql = 'SELECT COUNT(*) as count FROM copies WHERE book_id = ? AND status = "available"';
        const result = await db.query(sql, [bookId]);
        return result[0].count;
      }

}

export default Copy;
