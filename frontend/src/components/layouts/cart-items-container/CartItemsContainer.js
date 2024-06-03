import React, { useContext, useEffect } from "react";
import './cart-items-container.styles.css';
import CartItemCard from "../../cards/cart-item-card/CartItemCard";
import { CartContext, UserContext, LoanHistoryContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api'; // Ensure correct path to the api.js

const CartItemsContainer = () => {
    const { cartItems, totalAmount, setCartItems } = useContext(CartContext);
    const { authenticatedUser } = useContext(UserContext);
    const { setLoanHistory } = useContext(LoanHistoryContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (authenticatedUser) {
                try {
               //     console.log(`Fetching cart items for member ID: ${authenticatedUser.id.id}`);
                    const response = await api.get(`/library-api/cart/member/${authenticatedUser.id.id}`);
               //     console.log("Fetched Cart Items Response:", response.data);
                    
                    // Ensure each item has the necessary properties
                    const formattedItems = response.data.map(item => ({
                        ...item,
                        title: item.title,
                        image_url: item.image_url,
                        author: item.author,
                    }));
                    
                //    console.log("Formatted Items:", formattedItems); // Add console.log to see the formatted items
                    
                    setCartItems(formattedItems);

                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchCartItems();
    }, [authenticatedUser, setCartItems]);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const handleBorrow = async () => {
        if (window.confirm("Are you sure ?")) {
        if (!authenticatedUser) {
            alert("You need to log in first to borrow books.");
            return;
        }

        const memberId = authenticatedUser.id;

        const loans = cartItems.map(item => ({
            copy_id: item.book_id, // Assuming `id` is the identifier for the book copy
            member_id: memberId.id,
            loan_date: formatDate(new Date()),
            due_date: formatDate(new Date(new Date().setDate(new Date().getDate() + 14))) // Assuming a 2-week loan period
        }));

        try {
            let loanResponses = [];
            for (const loan of loans) {
                console.log("Loan Data:", loan); // Added console log for debugging
                const response = await api.post('/library-api/loan', loan);
                console.log("response : ",response);
                loanResponses.push(response.data);
            }
               console.log("Loanresponse.length :",loanResponses.length );
            if (loanResponses.length > 0) {
                setLoanHistory(loanResponses);
                await api.delete(`/library-api/cart/member/${memberId.id}`); // Clear the cart in the backend
                setCartItems([]); // Clear the cart after borrowing
                alert("Books successfully borrowed.");
                navigate('/loan-history');
            } else {
                console.error("Failed to borrow books:", loanResponses);
                alert("An error occurred while borrowing books.");
            }
        } catch (error) {
            console.error("Error borrowing books:", error);
            alert("An error occurred while borrowing books.");
        }
      } 
    };

    return (
        <section className="cart-items-container">
            <div className="container">
                {totalAmount === 0 ? (
                    <h2>Currently your cart is empty</h2>
                ) : (
                    <React.Fragment>
                        <h2>Your Cart</h2>

                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} bookData={item} />
                        ))}

                        <button onClick={handleBorrow} className="button-primary">Borrow</button>
                    </React.Fragment>
                )}
            </div>
        </section>
    );
}

export default CartItemsContainer;
