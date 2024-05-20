import { expect } from 'chai';
import sinon from 'sinon';
import * as BookController from '../controllers/BookController.js';
import Book from '../models/Book.js';

describe('BookController', function() {
  afterEach(function() {
    sinon.restore(); // Restore all stubs after each test
  });

  describe('getAllBooks', function() {
    it('should return all books', async function() {
      const books = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
      sinon.stub(Book, 'getAllBooks').resolves(books);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.getAllBooks(req, res);

      expect(res.json.calledWith(books)).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Book, 'getAllBooks').rejects(error);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.getAllBooks(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve books', error })).to.be.true;
    });
  });

  describe('getBookById', function() {
    it('should return the book with the given ID', async function() {
      const book = { id: 1, title: 'Book 1' };
      sinon.stub(Book, 'getBookById').resolves(book);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.getBookById(req, res);

      expect(res.json.calledWith(book)).to.be.true;
    });

    it('should return 404 if the book is not found', async function() {
      sinon.stub(Book, 'getBookById').resolves(null);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.getBookById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith({ message: 'Book not found' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Book, 'getBookById').rejects(error);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.getBookById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve book', error })).to.be.true;
    });
  });

  describe('addBook', function() {
    it('should add a new book', async function() {
      const book = { id: 1, title: 'Book 1' };
      sinon.stub(Book, 'addBook').resolves(book.id);

      const req = {
        body: { title: 'Book 1', author: 'Author 1', genre: 'Genre 1', publicationYear: 2023, isbn: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.addBook(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Book added successfully', id: book.id })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Book, 'addBook').rejects(error);

      const req = {
        body: { title: 'Book 1', author: 'Author 1', genre: 'Genre 1', publicationYear: 2023, isbn: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.addBook(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to add book', error })).to.be.true;
    });
  });

  describe('updateBook', function() {
    it('should update an existing book', async function() {
      const book = { id: 1, title: 'Updated Book', author: 'Updated Author', genre: 'Updated Genre', publicationYear: 2023, isbn: '1234567890' };
      sinon.stub(Book, 'updateBook').resolves(1);
      sinon.stub(Book, 'getBookById').resolves(book); // Ensure getBookById resolves the book

      const req = {
        params: { id: 1 },
        body: { title: 'Updated Book', author: 'Updated Author', genre: 'Updated Genre', publicationYear: 2023, isbn: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.updateBook(req, res);

      expect(res.send.calledWith({ message: 'Book updated successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Book, 'updateBook').rejects(error);
      sinon.stub(Book, 'getBookById').resolves({ id: 1 }); // Ensure getBookById resolves the book

      const req = {
        params: { id: 1 },
        body: { title: 'Updated Book', author: 'Updated Author', genre: 'Updated Genre', publicationYear: 2023, isbn: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.updateBook(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to update book', error })).to.be.true;
    });
  });

  describe('deleteBook', function() {
    it('should delete a book', async function() {
      sinon.stub(Book, 'deleteBook').resolves(1);
      sinon.stub(Book, 'getBookById').resolves({ id: 1 }); // Ensure getBookById resolves the book

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.deleteBook(req, res);

      expect(res.send.calledWith({ message: 'Book deleted successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Book, 'deleteBook').rejects(error);
      sinon.stub(Book, 'getBookById').resolves({ id: 1 }); // Ensure getBookById resolves the book

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await BookController.deleteBook(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to delete book', error })).to.be.true;
    });
  });
});