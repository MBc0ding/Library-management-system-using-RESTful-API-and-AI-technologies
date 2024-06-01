import React, { useContext, useEffect, useState } from "react";
import './productListingCard.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, CartContext } from '../../../App';
import api from '../../../services/api'; // Import your API service

const ProductListingCard = ({ bookData }) => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { isLoggedIn } = useContext(UserContext); // Get login state from context
    const navigate = useNavigate();
    const [availableCopies, setAvailableCopies] = useState(0);

    useEffect(() => {
        const fetchAvailableCopies = async () => {
            try {
                const response = await api.get(`/library-api/copy/NbOfAvailableCopies/${bookData.id}`);
                setAvailableCopies(response.data.availableCopies);
            } catch (error) {
                console.error("Error fetching available copies:", error);
            }
        };

        fetchAvailableCopies();
    }, [bookData.id]);

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
                {availableCopies > 0 ? (
                    <button onClick={handleAddToCart} className="product-listing-button">Add to cart</button>
                ) : (
                    <button disabled className="product-listing-button not-available">Not Available</button>
                )}
            </div>
        </div>
    )
}

export default ProductListingCard;
