import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { UserContext } from '../../../App';
import { jwtDecode }  from 'jwt-decode'; // Corrected import

const AuthForm = ({ buttonName, role }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();
    const { setAuthenticatedUser } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        if (buttonName === 'Login') {
            console.log("role:",role);
            const endpoint = role === 'admin' ? '/library-api/auth/admin-login' : '/library-api/auth/login';
            api.post(endpoint, { email, password })
                .then((response) => {
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    const decodedToken = jwtDecode(token); // Decode the JWT token
                    setAuthenticatedUser({ id: decodedToken.id, token }); // Set authenticatedUser with token and user ID
                    navigate(role === 'admin' ? '/admin-dashboard' : '/'); // Redirect based on role
                })
                .catch((err) => {
                    setError('Incorrect email or password'); // Set error message on failure
                    console.log(err);
                });
        } else {
            api.post('/library-api/auth/signup', { name: username, email, password })
                .then(() => {
                    navigate('/login');
                })
                .catch((err) => {
                    setError('Error signing up, please try again'); // Set error message on failure
                    console.log(err);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {buttonName === "Sign Up" && (
                <div className='form-group'>
                    <label>Username</label>
                    <input 
                        type="text" 
                        className='form-input' 
                        placeholder='Enter fullname' 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>
            )}

            <div className='form-group'>
                <label>Email</label>
                <input 
                    type="email" 
                    className='form-input' 
                    placeholder='username@example.com' 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input 
                    type="password" 
                        className='form-input' 
                        placeholder='enter your password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} 
                        required
                />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

            <div className='form-group'>
                <input 
                    type="submit" 
                    className='button-primary' 
                    value={buttonName} 
                />
            </div>
        </form>
    );
};

export default AuthForm;
