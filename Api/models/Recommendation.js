import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Recommendation {
    constructor(id, member_id, recommended_books, reasons, created_at) {
        this.id = id;
        this.member_id = member_id;
        this.recommended_books = recommended_books;
        this.reasons = reasons;
        this.created_at = created_at;
    }

    static async getAllRecommendations() {
        const sql = 'SELECT * FROM recommendations';
        const rows = await db.query(sql);
        return rows;
    }

    static async getRecommendationById(id) {
        const sql = 'SELECT * FROM recommendations WHERE id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];  // Return a single recommendation
    }

    static async addRecommendation(recommendation) {
        const sql = 'INSERT INTO recommendations (member_id, recommended_books, reasons) VALUES (?, ?, ?)';
        const result = await db.query(sql, [
            recommendation.member_id, recommendation.recommended_books, recommendation.reasons
        ]);
        return result.insertId;  // Return the ID of the inserted recommendation
    }

    static async updateRecommendation(id, recommendation) {
        const sql = 'UPDATE recommendations SET member_id = ?, recommended_books = ?, reasons = ? WHERE id = ?';
        const result = await db.query(sql, [
            recommendation.member_id, recommendation.recommended_books, recommendation.reasons, id
        ]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async deleteRecommendation(id) {
        const sql = 'DELETE FROM recommendations WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }
}

export default Recommendation;
