import express from 'express';
import * as BookController from '../controllers/BookController.js';

const router = express.Router();

// Define the routes relative to the base path '/books'
router.get('/', BookController.getAllBooks); // GET /books
router.get('/:id', BookController.getBookById); // GET /books/:id
router.get('/:id/NbrOfcopies', BookController.getNumberOfCopies); // GET /books/:id/copies
router.post('/', BookController.addBook); // POST /books
router.put('/:id', BookController.updateBook); // PUT /books/:id
router.delete('/:id', BookController.deleteBook); // DELETE /books/:id
router.get('/genre/:genre', BookController.getBooksByGenre); // GET /books/genre/:genre 

export default router;
