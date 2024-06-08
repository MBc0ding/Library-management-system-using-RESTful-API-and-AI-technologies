import React from 'react';
import api from '../../../services/api';
import FormBook from './FormBook';

const AddBook = () => {
    const handleAddBook = async (book) => {
        try {
            // Check if the book title already exists
            const existingBook = await api.get(`/library-api/book/title/${book.title}`);
            if (existingBook.data.length > 0) {
                alert('A book with the same title already exists.');
                return;
            }

            await api.post('/library-api/book', book);
            alert('Book added successfully!');
        } catch (error) {
            console.error('Failed to add book', error);
            alert('Failed to add book');
        }
    };

    return <FormBook formTitle="Add a New Book" onSubmit={handleAddBook} />;
};

export default AddBook;
