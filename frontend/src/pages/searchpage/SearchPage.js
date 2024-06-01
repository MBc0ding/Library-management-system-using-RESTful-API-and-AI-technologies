import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/layouts/navbar/Navbar';
import Footer from '../../components/layouts/footer/Footer';
import './searchpage.styles.css';
import SearchResultCard from '../../components/cards/search-result-card/SearchResultCard';
import api from '../../services/api'; // Ensure you have the correct path to your API service

const SearchPage = () => {
    const location = useLocation();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/library-api/book');
                const allBooks = response.data;
                const filteredBooks = allBooks.filter((data) =>
                    data.title.toLowerCase().includes(location.state.toLowerCase()) ||
                    data.author.toLowerCase().includes(location.state.toLowerCase()) ||
                    data.genre.toLowerCase().includes(location.state.toLowerCase())
                );
                setSearchResult(filteredBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [location.state]);

    return (
        <section>
            <Navbar darkTheme={true} />
            <div className='search-result-container'>
                <div className="container">
                    <h2>Your Search Result</h2>
                    {searchResult.length > 0 ? (
                        searchResult.map((result) => (
                            <SearchResultCard key={result.id} bookData={result} />
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default SearchPage;
