import React, { useState, useEffect, useContext } from 'react';
import './detailsSection.styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api'; // Ensure correct path to the api.js
import { UserContext, CartContext } from '../../../App';

const DetailsSection = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});
    const { isLoggedIn } = useContext(UserContext); // Get login state from context
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [availableCopies, setAvailableCopies] = useState(0);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await api.get(`/library-api/book/${id}`);
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        const fetchAvailableCopies = async () => {
            try {
                const response = await api.get(`/library-api/copy/NbOfAvailableCopies/${id}`);
                setAvailableCopies(response.data.availableCopies);
            } catch (error) {
                console.error("Error fetching available copies:", error);
            }
        };

        fetchBookDetails();
        fetchAvailableCopies();
    }, [id]);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert('You need to log in first to continue.');
            navigate('/login');
            return;
        }

        if (cartItems.length >= 3) {
            alert('You can only borrow a maximum of 3 books.');
            return;
        }

        const isBookInCart = cartItems.some(item => item.id === bookData.id);
        if (isBookInCart) {
            alert('This book is already in your cart.');
        } else {
            setCartItems([...cartItems, bookData]);
            alert(`The book ${bookData.title} is added to the cart`);
        }
    }

    return (
        <section className="detail-section-container">
            <div className='container'>
                <div className="flex-container">
                    <div className='book-img-container'>
                        <img src={bookData.image_url} alt="book" />
                    </div>
                    <div className='book-detail-container'>
                        <h2>{bookData.title}</h2>
                        <p className="text-primary"><strong>{bookData.author}</strong></p>
                        <p><b>Genre</b>: {bookData.genre}</p>
                        <b>Book Description</b>:<p className="book-description">{bookData.description}</p>
                        <p><b>Language</b>: {bookData.language}</p>
                        <p><b>Book Length</b>: {bookData.length}</p>
                        {availableCopies > 0 ? (
                            <a onClick={handleAddToCart} className="button-primary">Add to cart</a>
                        ) : (
                            <a className="button-primary not-available">Not Available</a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetailsSection;
