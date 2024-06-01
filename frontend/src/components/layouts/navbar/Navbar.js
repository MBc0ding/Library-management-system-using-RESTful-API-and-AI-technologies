import React, { useContext } from "react";
import './navbar.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../../App";
import { ReactComponent as Cart } from '../../../assets/cart.svg';

const Navbar = ({ darkTheme, darkText }) => {
    const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthenticatedUser(null);
        navigate('/login');
    };

    const showLoginandSignUp = (
        <nav className="nav-links-container">
            <Link to="/" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Home</Link>
            <Link to="/books" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Books</Link>
            <Link to="/admin-login" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Admin Login</Link>
            <Link to="/login" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Member Login</Link>
            <Link to="/signup" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Sign up</Link>         
        </nav>
    )

    const showLogoutAndCart = (
        <nav className="nav-links-container">
            <Link to="/" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Home</Link>
            <Link to="/books" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Books</Link>
            <Link to="/loan-history" className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Loan History</Link>
            <Link to="/cart" className="cart-link"><Cart /></Link> 
            <a onClick={handleLogout} className={`${darkText ? 'nav-links-dark' : 'nav-links'}`}>Logout</a>
            
        </nav>
    )

    return (
        <section className={`navbar-container ${darkTheme ? 'background-dark relative' : 'background-transparent'}`}>
            <div className="container flex justify-between align-center">
                <Link to="/" className="logo">My<span className="text-primary">Library</span></Link>

                {authenticatedUser ? showLogoutAndCart : showLoginandSignUp}
            </div>
        </section>
    )
}

export default Navbar;
