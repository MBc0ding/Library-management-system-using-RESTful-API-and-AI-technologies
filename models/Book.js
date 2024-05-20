import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure db.js exports properly

class Book {
    constructor(id, title, author, genre, publicationYear, isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
    }

    static async getAllBooks() {
        const sql = 'SELECT * FROM books';
        const rows = await db.query(sql);
        return rows;
    }

    static async getBookById(id) {
        const sql = 'SELECT * FROM books WHERE id = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];  // Return a single book
    }

    static async addBook(book) {
        const sql = 'INSERT INTO books (title, author, genre, publicationYear, isbn) VALUES (?, ?, ?, ?, ?)';
        const result = await db.query(sql, [book.title, book.author, book.genre, book.publicationYear, book.isbn]);
        return result.insertId;  // Return the ID of the inserted book
    }

    static async updateBook(id, book) {
        const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, publicationYear = ?, isbn = ? WHERE id = ?';
        const result = await db.query(sql, [book.title, book.author, book.genre, book.publicationYear, book.isbn, id]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async deleteBook(id) {
        const sql = 'DELETE FROM books WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }
}

export default Book;
