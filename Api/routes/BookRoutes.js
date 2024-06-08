import express from 'express';
import * as BookController from '../controllers/BookController.js';

const router = express.Router();

// Define the routes relative to the base path '/books'
router.get('/', BookController.getAllBooks); // GET /book
router.get('/:id', BookController.getBookById); // GET /book/:id
router.get('/:id/NbrOfcopies', BookController.getNumberOfCopies); // GET /book/:id/copies
router.post('/', BookController.addBook); // POST /book
router.put('/:id', BookController.updateBook); // PUT /book/:id
router.delete('/:id', BookController.deleteBook); // DELETE /book/:id
router.get('/genre/:genre', BookController.getBooksByGenre); // GET /book/genre/:genre 
router.get('/title/:title', BookController.getBookByTitle); // GET /book/title/:title

export default router;
