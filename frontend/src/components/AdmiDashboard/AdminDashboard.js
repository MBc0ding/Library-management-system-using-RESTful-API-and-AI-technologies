// AdminDashboard.js
import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBook, faUser, faPlus, faEye, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';

const WelcomeMessage = () => (
    <div className="content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the library management system admin dashboard.</p>
    </div>
);

const AdminDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAuthenticatedUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthenticatedUser(null);
        navigate('/admin-login');
        window.location.reload();
    };

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Library Admin</h2>
                </div>
                <hr />
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/admin-dashboard">
                            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                        </Link>
                    </li>
                    <hr />
                    <li className="menu-section">
                        <div className="section-header">
                            <FontAwesomeIcon icon={faBook} /> Books
                        </div>
                        <ul className="submenu">
                            <li>
                                <Link to="/admin-dashboard/add-book">
                                    <FontAwesomeIcon icon={faPlus} /> Add Book
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-dashboard/view-books">
                                    <FontAwesomeIcon icon={faEye} /> View Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-dashboard/view-copies">
                                    <FontAwesomeIcon icon={faEye} /> View Copies
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <hr />
                    <li className="menu-section">
                        <div className="section-header">
                            <FontAwesomeIcon icon={faUser} /> Members
                        </div>
                        <ul className="submenu">
                            <li>
                                <Link to="/admin-dashboard/view-members">
                                    <FontAwesomeIcon icon={faEye} /> View Members
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="logout">
                        <button onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </li>
                </ul>
            </aside>
            <main className="content">
                {location.pathname === "/admin-dashboard" && <WelcomeMessage />}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
