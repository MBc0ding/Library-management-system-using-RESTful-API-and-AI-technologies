import React from 'react';
import AuthBgImg from '../../assets/auth-bg.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layouts/navbar/Navbar';
import AuthForm from '../../components/forms/authForm/AuthForm';

const Login= () => {
    return (
        <React.Fragment>
            <Navbar darkText={true}/>
            <section className="signup-container">
                <div className='signup-img-container'>
                    <img src={AuthBgImg} alt="authentication-background" />
                </div>
                <div className="signup-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Member Login</h2>
                            <p>Enter your email and password.</p><br></br>
                            <AuthForm buttonName="Login" role="member" />
                        </div>
                        <p>
                        <strong>Not a member yet? <Link to="/signup">Click here</Link> to register.</strong>
                        </p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Login;
