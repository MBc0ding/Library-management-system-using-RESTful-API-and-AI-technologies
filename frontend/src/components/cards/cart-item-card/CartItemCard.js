import React, { useContext } from 'react';
import './cart-item-card.styles.css';
import { CartContext, UserContext } from '../../../App';
import api from '../../../services/api'; // Ensure correct path to the api.js

const CartItemCard = ({ bookData }) => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const { authenticatedUser } = useContext(UserContext);

    const handleRemove = async () => {
        try {
            //console.log("member_id:",authenticatedUser.id.id);
            //console.log("book_id: ",bookData.book_id);
            
            // Call the API to remove the item from the cart using authenticatedUser to get member_id
            await api.delete(`/library-api/cart/member/${authenticatedUser.id.id}/book/${bookData.book_id}`);

            // Update the cart items in the state
            setCartItems(cartItems.filter((item) => item.book_id !== bookData.book_id));
 
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert("An error occurred while removing the item from the cart.");
        }
        
    }

    return (
        <section className="cart-item">
            <div className="cart-item-img-container">
                <img src={bookData.image_url} alt="cart-item-img" className="cart-item-img" />
            </div>
            <div className="cart-item-content-container">
                <h2>{bookData.title}</h2>
                <p>{bookData.author}</p>

                <button onClick={handleRemove} className='delete_btn'>Remove from Cart</button>
            </div>
        </section>
    )
}

export default CartItemCard;
