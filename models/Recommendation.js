import db from '../utils/DBconnection.js';

class Recommendation {
  constructor(recommendation_id, member_id, recommended_book_ids, reasons) {
    this.recommendation_id = recommendation_id;
    this.member_id = member_id;
    this.recommended_book_ids = recommended_book_ids;
    this.reasons = reasons;
  }

  static async getAllRecommendations() {
    const sql = 'SELECT * FROM Recommendations';
    const rows = await db.query(sql);
    return rows;
  }

  static async getRecommendationById(id) {
    const sql = 'SELECT * FROM Recommendations WHERE recommendation_id = ?';
    const rows = await db.query(sql, [id]);
    return rows[0];
  }

  static async addRecommendation(recommendation) {
    const sql = 'INSERT INTO Recommendations (member_id, recommended_book_ids, reasons) VALUES (?, ?, ?)';
    const result = await db.query(sql, [recommendation.member_id, recommendation.recommended_book_ids, recommendation.reasons]);
    return result.insertId;
  }

  static async updateRecommendation(id, recommendation) {
    const sql = 'UPDATE Recommendations SET member_id = ?, recommended_book_ids = ?, reasons = ? WHERE recommendation_id = ?';
    const result = await db.query(sql, [recommendation.member_id, recommendation.recommended_book_ids, recommendation.reasons, id]);
    return result.affectedRows;
  }

  static async deleteRecommendation(id) {
    const sql = 'DELETE FROM Recommendations WHERE recommendation_id = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows;
  }
}

export default Recommendation;
