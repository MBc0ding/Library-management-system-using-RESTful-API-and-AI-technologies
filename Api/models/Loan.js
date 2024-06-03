import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Loan {
    constructor(id, copy_id, member_id, loan_date, due_date, return_date, fine, created_at) {
        this.id = id;
        this.copy_id = copy_id;
        this.member_id = member_id;
        this.loan_date = loan_date;
        this.due_date = due_date;
        this.return_date = return_date;
        this.fine = fine;
        this.created_at = created_at;
    }

    static async getAllLoans() {
        const sql = 'SELECT * FROM loans';
        const rows = await db.query(sql);
        return rows;
    }

    static async getLoanById(id) {
        const sql = 'SELECT * FROM loans WHERE id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];
    }

    static async getLoanByMemberId(id) {
        const sql =  `SELECT books.title AS book_title , loans.*  FROM loans
        JOIN copies ON loans.copy_id = copies.id
        JOIN books ON copies.book_id = books.id
        WHERE loans.member_id = ? `;
        const rows = await db.query(sql, [id]);
        return rows;  // Return a single loan
    }
    
    static async Check_NbOfLoans(id) {
 
        const sql = `SELECT count(*) as NbOfloans FROM loans WHERE member_id = ? AND return_date is null`;
        const result = await db.query(sql, [id]);
        return result[0].NbOfloans; 
    } 

    static async addLoan(loan) {
        const AvailableCopy_sql = `SELECT id from copies WHERE book_id = ? AND status = 'available' LIMIT 1`;
        const AvailableCopy = await db.query(AvailableCopy_sql , [loan.copy_id]); 
        if (!AvailableCopy) {
            throw new Error('No available copies found for this book.');
        }    
        const sql = 'INSERT INTO loans (copy_id, member_id, loan_date, due_date, return_date, fine) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await db.query(sql, [
            AvailableCopy[0].id , loan.member_id, loan.loan_date,
            loan.due_date, loan.return_date, loan.fine
        ]);
        
        // making the copy not available after loan insert because its borrowed
        await db.query(`UPDATE copies set status = 'not available' WHERE id = ? `,[AvailableCopy[0].id]);

        return result.insertId;  // Return the ID of the inserted loan
    }

    static async updateLoan(id, loan) {
        const sql = 'UPDATE loans SET copy_id = ?, member_id = ?, loan_date = ?, due_date = ?, return_date = ?, fine = ? WHERE id = ?';
        const result = await db.query(sql, [
            loan.copy_id, loan.member_id, loan.loan_date,
            loan.due_date, loan.return_date, loan.fine, id
        ]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async deleteLoan(id) {
        const sql = 'DELETE FROM loans WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }
}

export default Loan;
