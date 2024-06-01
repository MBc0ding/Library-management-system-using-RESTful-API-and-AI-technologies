import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct the import

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import CartPage from "./pages/cartpage/CartPage";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails";
import Login from "./pages/loginpage/Login";
import SignUp from "./pages/signup-page/Signup";
import AdminLogin from "./pages/adminpage/AdminLogin"; // Admin login page
import ScrollToTop from "./components/util/ScrollToTop";
import SearchPage from "./pages/searchpage/SearchPage";
import LoanHistoryPage from "./pages/Loanhistorypage/LoanHistoryPage";

export const UserContext = createContext({});
export const CartContext = createContext({});
export const LoanHistoryContext = createContext({});

const App = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loanHistory, setLoanHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token); // Decode the JWT token
            setAuthenticatedUser({ id: decodedToken.id, token }); // Set authenticatedUser with token and user ID
        }
    }, []);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += parseInt(item.price, 10);
        });

        setTotalAmount(total);
    }, [cartItems]);

    const isLoggedIn = !!authenticatedUser;

    return (
        <ScrollToTop>
            <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser, isLoggedIn }}>
                <CartContext.Provider value={{ cartItems, totalAmount, setCartItems }}>
                    <LoanHistoryContext.Provider value={{ loanHistory, setLoanHistory }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/books" element={<BooksPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/book-details/:id" element={<BookDetailsPage />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin-login" element={<AdminLogin />} />
                            <Route path="/loan-history" element={<LoanHistoryPage />} />
                        </Routes>
                    </LoanHistoryContext.Provider>
                </CartContext.Provider>
            </UserContext.Provider>
        </ScrollToTop>
    );
};

export default App;
