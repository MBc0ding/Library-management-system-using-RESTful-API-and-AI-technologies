import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Admin {
    constructor(id, user_id) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.contact = contact;
        this.user_id = user_id;
    }

    static async findByEmail(email) {
        const sql = 'SELECT id, email, password FROM users WHERE email = ? AND id in (SELECT user_id FROM admins)';
        const rows = await db.query(sql, [email]);
        return rows[0];  // Return the email
    }
}

export default Admin;
