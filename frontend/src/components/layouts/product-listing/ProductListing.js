import React, { useEffect, useState } from 'react';
import './productListing.styles.css';
import ProductListingCard from '../../cards/product-listing-card/ProductListingCard';
import api from '../../../services/api'; // Ensure correct path to the api.js

const ProductListing = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/library-api/book');
                setBooks(response.data.slice(0, 5)); // Limit to first 5 books
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="product-listing-container">
            <div className="container">
                <h2>Here are some <span className="text-primary">books</span> that you might like</h2>
                <div className="listing-container">
                    {books.map((book) => (
                        <ProductListingCard key={book.id} bookData={book} className="product-listing-card" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductListing;
