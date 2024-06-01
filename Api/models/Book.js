import db from '../utils/DBconnection.js';  // Adjust the path if necessary and ensure DBconnection.js exports properly

class Book {
    constructor(id, title, author, genre, publicationYear, isbn, description, language, length, image) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.description = description;
        this.language = language;
        this.length = length;
        this.image = image;
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
        const sql = 'INSERT INTO books (title, author, genre, publicationYear, isbn, description, language, length, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(sql, [book.title, book.author, book.genre, book.publicationYear, book.isbn, book.description, book.language, book.length, book.image]);
        return result.insertId;  // Return the ID of the inserted book
    }

    static async updateBook(id, book) {
        const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, publicationYear = ?, isbn = ?, description = ?, language = ?, length=?, image = ? WHERE id = ?';
        const result = await db.query(sql, [book.title, book.author, book.genre, book.publicationYear, book.isbn, book.description, book.language, book.length, book.image, id]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async deleteBook(id) {
        const sql = 'DELETE FROM books WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows;  // Return the number of affected rows
    }

    static async getNumberOfCopies(bookId) {
        const sql = 'SELECT COUNT(*) as numberOfCopies FROM copies WHERE book_id = ?';
        const rows = await db.query(sql, [bookId]);
        return rows[0].numberOfCopies;  // Return the number of copies
    }


    static async getBooksByGenre(genre) {
        const sql = 'SELECT * FROM books WHERE genre = ?';
        const rows = await db.query(sql, [genre]);
        return rows;  // Return the list of books for the specified genre
    }


}

export default Book;
