import React, { useState, useEffect } from 'react';
import './FormBook.styles.css';

const FormBook = ({ bookData, onSubmit, formTitle }) => {
    const [title, setTitle] = useState(bookData?.title || '');
    const [author, setAuthor] = useState(bookData?.author || '');
    const [genre, setGenre] = useState(bookData?.genre || '');
    const [publicationYear, setPublicationYear] = useState(bookData?.publication_year || '');
    const [isbn, setIsbn] = useState(bookData?.isbn || '');
    const [description, setDescription] = useState(bookData?.description || '');
    const [language, setLanguage] = useState(bookData?.language || '');
    const [length, setLength] = useState(bookData?.length || '');
    const [imageUrl, setImageUrl] = useState(bookData?.image_url || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            author,
            genre,
            publication_year: publicationYear,
            isbn,
            description,
            language,
            length,
            image_url: imageUrl,
        });
    };

    return (
        <div className="book-container">
            <h2>{formTitle}</h2>
            <form onSubmit={handleSubmit}>
                <div className="book-form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Genre</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Publication Year</label>
                    <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>ISBN</label>
                    <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="book-form-group">
                    <label>Language</label>
                    <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Length</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} required />
                </div>
                <div className="book-form-group">
                    <label>Image URL</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                </div>
                <button type="submit" className="book-submit-button">{formTitle.includes('Add') ? 'Add Book' : 'Modify Book'}</button>
            </form>
        </div>
    );
};

export default FormBook;
