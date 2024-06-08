import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from './services/api';

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import CartPage from "./pages/cartpage/CartPage";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails";
import Login from "./pages/loginpage/Login";
import SignUp from "./pages/signup-page/Signup";
import AdminLogin from "./pages/adminpage/AdminLogin";
import AdminDashboard from "./components/AdmiDashboard/AdminDashboard";
import AddBook from "./components/AdmiDashboard/Books/AddBook";
import ModifyBook from "./components/AdmiDashboard/Books/ModifyBook";
import AddCopy from "./components/AdmiDashboard/Books/AddCopy";
import ViewBooks from "./components/AdmiDashboard/Books/ViewBooks";
import ViewCopies from "./components/AdmiDashboard/Copies/ViewCopies";
import ModifyCopy from "./components/AdmiDashboard/Copies/ModifyCopy";
import ViewMembers from "./components/AdmiDashboard/Members/ViewMembers";
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
            const decodedToken = jwtDecode(token);
            setAuthenticatedUser({ id: decodedToken.id, token });

            // Fetch loan history for the authenticated user
            fetchLoanHistory(decodedToken.id);
        }
    }, []);

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += parseInt(item.price, 10);
        });

        setTotalAmount(total);
    }, [cartItems]);

    const fetchLoanHistory = async (userId) => {
        try {
            const response = await api.get(`/library-api/loan/member/${userId}`);
            setLoanHistory(response.data);
        } catch (error) {
            console.error("Error fetching loan history:", error);
        }
    };

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
                            <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
                                <Route path="add-book" element={<AddBook />} />
                                <Route path="modify-book/:id" element={<ModifyBook />} />
                                <Route path="add-copy/:bookId" element={<AddCopy />} />
                                <Route path="view-books" element={<ViewBooks />} />
                                <Route path="view-copies" element={<ViewCopies />} />
                                <Route path="modify-copy/:id" element={<ModifyCopy />} />
                                <Route path="view-members" element={<ViewMembers />} />
                            </Route>
                        </Routes>
                    </LoanHistoryContext.Provider>
                </CartContext.Provider>
            </UserContext.Provider>
        </ScrollToTop>
    );
};

export default App;
