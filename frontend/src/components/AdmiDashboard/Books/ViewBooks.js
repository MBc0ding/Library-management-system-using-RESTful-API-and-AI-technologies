import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './ViewBooks.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/library-api/book');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleAddCopy = (bookId) => {
        navigate(`/admin-dashboard/add-copy/${bookId}`);
    };
    

    const handleModify = (bookId) => {
        navigate(`/admin-dashboard/modify-book/${bookId}`);
    };

    const handleDelete = async (bookId) => {
        try {
            await api.delete(`/library-api/book/${bookId}`);
            setBooks(books.filter((book) => book.id !== bookId));
            alert('Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book');
        }
    };

    return (
        <div className="view-books-container">
            <h2>Books List</h2>
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Publication Year</th>
                        <th>ISBN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.publication_year}</td>
                            <td>{book.isbn}</td>
                            <td>
                                <button className="action-button add-copy" onClick={() => handleAddCopy(book.id)}>
                                    <FontAwesomeIcon icon={faPlus} /> Add Copy
                                </button>
                                <button className="action-button modify" onClick={() => handleModify(book.id)}>
                                    <FontAwesomeIcon icon={faEdit} /> Modify
                                </button>
                                <button className="action-button delete" onClick={() => handleDelete(book.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewBooks;
