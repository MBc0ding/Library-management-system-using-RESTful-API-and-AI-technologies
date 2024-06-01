import React, { useContext } from 'react';
import './cart-item-card.styles.css';
import { CartContext } from '../../../App';

const CartItemCard = ({ bookData }) => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const handleRemove = () => {
        console.log(bookData.id);
        setCartItems(cartItems.filter((item) => item.id !== bookData.id));
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