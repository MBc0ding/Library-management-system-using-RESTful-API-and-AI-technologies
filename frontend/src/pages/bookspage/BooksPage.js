import React, { useEffect, useState } from "react";
import './booksPage.styles.css';
import Navbar from '../../components/layouts/navbar/Navbar';
import SearchInputForm from '../../components/forms/searchInputForm/SearchInputForm';
import ProductListingAll from "../../components/layouts/product-listing-all/ProductListingAll";
import Footer from '../../components/layouts/footer/Footer';
import api from '../../services/api'; // Ensure correct path to the api.js

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await api.get('/library-api/book');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <Navbar darkTheme={true} />
            <div className="search-container">
                <h2>Find the <span className="text-primary">Books</span> that you want</h2>
                <SearchInputForm darkTheme={false} />
            </div>
            <ProductListingAll books={books} />
            <Footer />
        </section>
    );
}

export default BooksPage;
