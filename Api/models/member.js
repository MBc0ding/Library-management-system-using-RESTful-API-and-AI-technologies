import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Member {
    constructor(id, name, email, password, address, contact, user_id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.contact = contact;
        this.user_id = user_id;
    }

    static async getAllMembers() {
        const sql = 'SELECT members.id, users.name, users.email FROM members JOIN users ON members.user_id = users.id';
        const rows = await db.query(sql);
        return rows;  // Return all members
    }

    static async create(member) {
        try {
            const userSql = 'INSERT INTO users (name, email, password, address, contact) VALUES (?, ?, ?, ?, ?)';
            const userResult = await db.query(userSql, [member.name, member.email, member.password, member.address, member.contact]);

            const memberSql = 'INSERT INTO members (user_id) VALUES (?)';
            const memberResult = await db.query(memberSql, [userResult.insertId]);
         // console.log("memberResult: ", memberResult);  // For debugging */

            return  memberResult.insertId;  // Return the ID of the inserted member
        } catch (error) {
            console.error('Error during member creation:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = 'SELECT id, email, password FROM users WHERE email = ? AND  id in (SELECT user_id FROM members)';
        const rows = await db.query(sql, [email]);
        return rows[0];   // Return the email
    }

    static async findById(id) {
        const sql = 'SELECT users.id, users.name, users.email FROM members JOIN users ON members.user_id = users.id WHERE members.id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];   // Return a single member
    }

    static async getMemberId(id) {
        const sql = 'SELECT id FROM members WHERE user_id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];   // Return member id
    }


    static async update(id, member) {
        const sql = 'UPDATE users SET name = ?, email = ?, password = ?, address = ?, contact = ? WHERE id = (SELECT user_id FROM members WHERE id = ?)';
        const result = await db.query(sql, [member.name, member.email, member.password, member.address, member.contact, id]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = (SELECT user_id FROM members WHERE id = ?)';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }
}

export default Member;
