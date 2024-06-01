import React from 'react';
import AuthBgImg from '../../assets/LibraryAdmin_img.jpg';
import Navbar from '../../components/layouts/navbar/Navbar';
import AuthForm from '../../components/forms/authForm/AuthForm';

const AdminLogin = () => {
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
                            <h2>Admin Login</h2>
                            <p>Enter your email and password.</p><br></br>
                            <AuthForm buttonName="Login" role="admin" />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default AdminLogin;
