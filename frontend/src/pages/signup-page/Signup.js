import React from 'react';
import './signup.styles.css';
import AuthBgImg from '../../assets/auth-bg.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layouts/navbar/Navbar';
import AuthForm from '../../components/forms/authForm/AuthForm';

const Signup = () => {
    return (
        <React.Fragment>
            <Navbar darkText={true} />
            <section className="signup-container">
                <div className='signup-img-container'>
                    <img src={AuthBgImg} alt="authentication-background" />
                </div>
                <div className="signup-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Create a new account</h2>
                            <p>Enter your informations below.</p><br></br>
                            <AuthForm buttonName="Sign Up" />
                        </div>
                        <p>
                        <strong>Already a member ? <Link to="/login">Click here </Link>to sign in.</strong>
                        </p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Signup;
