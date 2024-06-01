import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
    const { authenticatedUser } = useContext(UserContext);

    return authenticatedUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
