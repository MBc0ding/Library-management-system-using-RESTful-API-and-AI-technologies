import db from '../utils/DBconnection.js';

class Member {
    constructor(member_id, name, address, contact_details) {
        this.member_id = member_id;
        this.name = name;
        this.address = address;
        this.contact_details = contact_details;
    }

    static async getAllMembers() {
        const sql = 'SELECT * FROM members';
        const rows = await db.query(sql);
        return rows;
    }

    static async getMemberById(id) {
        const sql = 'SELECT * FROM members WHERE member_id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];
    }

    static async addMember(member) {
        const sql = 'INSERT INTO members (name, address, contact_details) VALUES (?, ?, ?)';
        const result = await db.query(sql, [member.name, member.address, member.contact_details]);
        return result.insertId;
    }

    static async updateMember(id, member) {
        const sql = 'UPDATE members SET name = ?, address = ?, contact_details = ? WHERE member_id = ?';
        const result = await db.query(sql, [member.name, member.address, member.contact_details, id]);
        return result.affectedRows;
    }

    static async deleteMember(id) {
        const sql = 'DELETE FROM members WHERE member_id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;
    }
}

export default Member;
