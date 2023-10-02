// src/components/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import axios from 'axios';
import { API_BASE_URL } from './config';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`${API_BASE_URL}/api/login`, { // Use the base URL
            email: email,
            password: password
        }).then(response => {
            if (response.data) {
                localStorage.setItem('token', response.data);
                window.location.href = '/dashboard';
            }
        }).catch(err => {
            if (err.response && err.response.data) {
                // Check if the error message is an object and extract a meaningful message
                const errorMsg = typeof err.response.data === 'object' 
                    ? err.response.data.error || 'An error occurred.' 
                    : err.response.data;
                setError(errorMsg);
            } else {
                setError('An error occurred. Please try again.');
            }
        });
        
    };
    

    return (
        <div className="login-page">
            <div className="login-section">
                <h2 className="login-title">Login to Finance App</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" className="input-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                    <p className="switch-page">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
