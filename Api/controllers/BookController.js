import Book from '../models/Book.js';
import Copy from '../models/Copy.js';

export async function getAllBooks(req, res) {
    try {
        const books = await Book.getAllBooks();
        if (books.length === 0) {
            res.status(404).send({ message: 'No books found' });
            return;
        }
        res.json(books);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve books', error });
    }
}

export async function getBookById(req, res) {
    const { id } = req.params;
    try {
        const book = await Book.getBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve book', error });
    }
}

export async function addBook(req, res) {
    const { title, author, genre, publication_year, isbn, description, language, length, image_url } = req.body;
    if (!title || !author || !genre || !publication_year|| !isbn || !description || !language || !length || !image_url) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }

    try {
        const newBook = new Book(null, title, author, genre, publication_year, isbn, description, language, length, image_url);
        const id = await Book.addBook(newBook);
        res.status(201).json({ message: 'Book added successfully', id });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to add book', error });
    }
}

export async function updateBook(req, res) {
    const { id } = req.params;
    const { title, author, genre, publication_year, isbn, description, language, length, image_url } = req.body;

    try {
        const existingBook = await Book.getBookById(id);
        if (!existingBook) {
            return res.status(404).send({ message: 'Book not found' });
        }

        // Merge the new values with the existing book details
        const updatedBook = {
            ...existingBook,
            title: title !== undefined ? title : existingBook.title,
            author: author !== undefined ? author : existingBook.author,
            genre: genre !== undefined ? genre : existingBook.genre,
            publicationYear: publication_year !== undefined ? publication_year : existingBook.publicationYear,
            isbn: isbn !== undefined ? isbn : existingBook.isbn,
            description: description !== undefined ? description : existingBook.description,
            language: language !== undefined ? language : existingBook.language,
            length: length !== undefined ? length : existingBook.length,
            image: image_url !== undefined ? image_url : existingBook.image
        };

        const affectedRows = await Book.updateBook(id, updatedBook);
        if (affectedRows > 0) {
            res.send({ message: 'Book updated successfully' });
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to update book', error });
    }
}


export async function deleteBook(req, res) {
    const { id } = req.params;
    try {
        const existingBook = await Book.getBookById(id);
        if (!existingBook) {
            return res.status(404).send({ message: 'Book not found' });
        }
        
        await Copy.deleteCopy(id);
        const affectedRows = await Book.deleteBook(id);
        
        if (affectedRows > 0) {
            res.send({ message: 'Book deleted successfully' });
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to delete book', error });
    }
}

export async function getNumberOfCopies(req, res) {
    const { id } = req.params;
    try {
        const numberOfCopies = await Book.getNumberOfCopies(id);
        res.json({ numberOfCopies });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve number of copies', error });
    }
}

export async function getBooksByGenre(req, res) {
    const { genre } = req.params;
    try {
        const books = await Book.getBooksByGenre(genre);
        if (books.length === 0) {
            res.status(404).send({ message: 'No books found for this genre' });
            return;
        }
        res.json(books);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve books by genre', error });
    }
}

export async function getBookByTitle(req, res) {
    const { title } = req.params;
    try {
        const books = await Book.getBookByTitle(title);
        res.json(books);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve books by title', error });
    }
}
