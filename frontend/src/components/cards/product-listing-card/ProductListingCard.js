import React, { useContext, useEffect, useState } from "react";
import './productListingCard.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, CartContext, LoanHistoryContext } from '../../../App';
import api from '../../../services/api'; // Import your API service

const ProductListingCard = ({ bookData }) => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { isLoggedIn, authenticatedUser } = useContext(UserContext); // Get login state from context
    const { loanHistory, setLoanHistory } = useContext(LoanHistoryContext);
    const navigate = useNavigate();
    const [availableCopies, setAvailableCopies] = useState(0);
    const [isBorrowed, setIsBorrowed] = useState(false);

    useEffect(() => {
        const fetchAvailableCopies = async () => {
            try {
                const response = await api.get(`/library-api/copy/NbOfAvailableCopies/${bookData.id}`);
                setAvailableCopies(response.data.availableCopies);
            } catch (error) {
                console.error("Error fetching available copies:", error);
            }
        };

        const fetchLoanHistory = async () => {
            if (authenticatedUser) {
                try {
                    const response = await api.get(`/library-api/loan/member/${authenticatedUser.id.id}`);
                    setLoanHistory(response.data);
                } catch (error) {
                    console.error("Error fetching loan history:", error);
                }
            }
        };

        fetchAvailableCopies();
        fetchLoanHistory();
    }, [bookData.id, authenticatedUser, setLoanHistory]);

    useEffect(() => {
        const checkIfBorrowed = () => {
            if (loanHistory && loanHistory.length > 0) {
                const borrowedBook = loanHistory.some(loan => loan.book_title === bookData.title && loan.return_date === null);
                setIsBorrowed(borrowedBook);
            }
        };

        checkIfBorrowed();
    }, [loanHistory, bookData]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            alert('You need to log in first to continue.');
            navigate('/login');
            return;
        }

        try {
            const response = await api.get(`/library-api/loan/checkNbOfLoans/${authenticatedUser.id.id}`);
            const { loanCount } = response.data;

            if (loanCount >= 3 || (loanCount + cartItems.length) >= 3) {
                alert('You can only borrow a maximum of 3 books.');
                return;
            }

            const isBookInCart = cartItems.some(item => item.id === bookData.id);
            if (isBookInCart) {
                alert('This book is already in your cart.');
            } else {
                const addResponse = await api.post(`/library-api/cart/member/${authenticatedUser.id.id}/book/${bookData.id}`);
                setCartItems([...cartItems, bookData]);
                alert(`The book ${bookData.title} is added to the cart`);
            }
        } catch (error) {
            console.error("Error adding book to cart:", error);
            alert('Failed to add book to cart.');
        }
    };

    return (
        <div className="product-listing-card">
            <div className="product-listing-img-container">
                <img src={bookData.image_url} alt="product-listing" className="product-listing-image" />
            </div>
            <div className="product-listing-details-container">
                <h3>{bookData.title}</h3>
                <p className="author-name">{bookData.author}</p>
            </div>
            <div className="card-btn-container">
                <Link to={`/book-details/${bookData.id}`} className="product-listing-button">More info</Link>
                {isBorrowed ? (
                    <button disabled className="product-listing-button owned">Owned</button>
                ) : availableCopies > 0 ? (
                    <button onClick={handleAddToCart} className="product-listing-button">Add to cart</button>
                ) : (
                    <button disabled className="product-listing-button not-available">Not Available</button>
                )}
            </div>
        </div>
    );
};

export default ProductListingCard;
