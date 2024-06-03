// models/Cart.js
import db from '../utils/DBconnection.js';

class Cart {
    constructor(id, member_id, book_id) {
        this.id = id;
        this.member_id = member_id;
        this.book_id = book_id;
    }

    static async getAllItemsByMemberId(member_id) {
        const rows = await db.query('SELECT b.id as book_id, b.title, b.author, b.image_url  FROM books b, cart c  WHERE b.id = c.book_id AND c.member_id = ?', [member_id]);
        return rows;
    }

    static async addItem(member_id, book_id) {
        const result = await db.query('INSERT INTO cart (member_id, book_id) VALUES (?, ?)', [member_id, book_id]);
        return result.insertId;
    }

    static async clearCartByMemberId(member_id) {
        const result = await db.query('DELETE FROM cart WHERE member_id = ?', [member_id]);
        return result.affectedRows;
    }

    static async RemoveCartItem(member_id, book_id) {
        const result = await db.query('DELETE FROM cart WHERE member_id = ? AND book_id = ?', [member_id, book_id]);
        return result.affectedRows;
  }
  
  

}
   
 
export default Cart;
