import React, { useState, useEffect, useContext } from 'react';
import './detailsSection.styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api'; // Ensure correct path to the api.js
import { UserContext, CartContext, LoanHistoryContext } from '../../../App';

const DetailsSection = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});
    const { isLoggedIn, authenticatedUser } = useContext(UserContext); // Get login state from context
    const { cartItems, setCartItems } = useContext(CartContext);
    const { loanHistory, setLoanHistory } = useContext(LoanHistoryContext);
    const navigate = useNavigate();
    const [availableCopies, setAvailableCopies] = useState(0);
    const [isBorrowed, setIsBorrowed] = useState(false);

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

        fetchBookDetails();
        fetchAvailableCopies();
        fetchLoanHistory();
    }, [id, authenticatedUser, setLoanHistory]);

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
            console.log("Loan count: ", loanCount);

            if (loanCount >= 3 || (loanCount + cartItems.length) >= 3) {
                alert('You can only borrow a maximum of 3 books.');
                return;
            }

            const isBookInCart = cartItems.some(item => item.id === bookData.id);
            if (isBookInCart) {
                alert('This book is already in your cart.');
            } else {
                const addResponse = await api.post(`/library-api/cart/member/${authenticatedUser.id.id}/book/${bookData.id}`);
                console.log("Add to Cart Response:", addResponse.data);
                setCartItems([...cartItems, bookData]);
                alert(`The book ${bookData.title} is added to the cart`);
            }
        } catch (error) {
            console.error("Error adding book to cart:", error);
            alert('Failed to add book to cart.');
        }
    };

    const handleBorrow = async () => {
        if (window.confirm("Are you sure you want to borrow this book?")) {
            if (!isLoggedIn) {
                alert('You need to log in first to continue.');
                navigate('/login');
                return;
            }

            try {
                const response = await api.get(`/library-api/loan/checkNbOfLoans/${authenticatedUser.id.id}`);
                const { loanCount } = response.data;
                console.log("Loan count: ", loanCount);

                if (loanCount >= 3 || (loanCount + cartItems.length) >= 3) {
                    alert('You can only borrow a maximum of 3 books.');
                    return;
                }

                const isBookInCart = cartItems.some(item => item.id === bookData.id);
                if (isBookInCart) {
                    alert('This book is already in your cart.');
                } else {
                    const addResponse = await api.post(`/library-api/loan`, {
                        copy_id: bookData.id,
                        member_id: authenticatedUser.id.id,
                        loan_date: new Date().toISOString().split('T')[0],
                        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                    });
                    console.log("Borrow Response:", addResponse.data);
                    setLoanHistory([...loanHistory, addResponse.data]);
                    alert(`The book ${bookData.title} is borrowed successfully`);
                }
            } catch (error) {
                console.error("Error borrowing book:", error);
                alert('Failed to borrow book.');
            }
        }
    };

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
                        {isBorrowed ? (
                            <a className="button-primary owned">Owned</a>
                        ) : availableCopies > 0 ? (
                            <>
                                <a onClick={handleAddToCart} className="button-primary">Add to cart</a>
                                <a onClick={handleBorrow} className="button-primary" style={{ marginLeft: '10px' }}>Borrow</a>
                            </>
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
