import db from '../utils/DBconnection.js';

class Loan {
  constructor(loan_id, book_id, member_id, loan_date, due_date, return_date, fines) {
    this.loan_id = loan_id;
    this.book_id = book_id;
    this.member_id = member_id;
    this.loan_date = loan_date;
    this.due_date = due_date;
    this.return_date = return_date;
    this.fines = fines;
  }

  static async getAllLoans() {
    const sql = 'SELECT * FROM Loans';
    const rows = await db.query(sql);
    return rows;
  }

  static async getLoanById(id) {
    const sql = 'SELECT * FROM Loans WHERE loan_id = ?';
    const rows = await db.query(sql, [id]);
    return rows[0];
  }

  static async addLoan(loan) {
    const sql = 'INSERT INTO Loans (book_id, member_id, loan_date, due_date, return_date, fines) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await db.query(sql, [loan.book_id, loan.member_id, loan.loan_date, loan.due_date, loan.return_date, loan.fines]);
    return result.insertId;
  }

  static async updateLoan(id, loan) {
    const sql = 'UPDATE Loans SET book_id = ?, member_id = ?, loan_date = ?, due_date = ?, return_date = ?, fines = ? WHERE loan_id = ?';
    const result = await db.query(sql, [loan.book_id, loan.member_id, loan.loan_date, loan.due_date, loan.return_date, loan.fines, id]);
    return result.affectedRows;
  }

  static async deleteLoan(id) {
    const sql = 'DELETE FROM Loans WHERE loan_id = ?';
    const result = await db.query(sql, [id]);
    return result.affectedRows;
  }
}

export default Loan;
