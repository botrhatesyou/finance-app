import React, { useState } from 'react';
import axios from 'axios';  // Make sure you've installed axios: npm install axios
import '../styles/SignupPage.css'
import { API_BASE_URL } from './config';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');  // To display any error messages

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Make a POST request to the backend's signup endpoint
        axios.post(`${API_BASE_URL}/api/signup`, {
            email: email,
            password: password
        })
        .then(response => {
            // Handle the response from the backend
            if (response.data.success) {
                alert('Signup successful! Please check your email for confirmation.');
                window.location.href = '/login';
            } else {
                setError(response.data.message);
            }
        })
        .catch(error => {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        });
    };

    return (
        <div className="signup-page">
            <div className="signup-section">
                <h2>Signup for FinanceApp</h2>
                {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Signup</button>
                    <p className="switch-page">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
                <p className="confirmation-message">After signing up, please check your email to confirm your account.</p> {/* Added this line */}
            </div>
        </div>
    );
}

export default SignupPage;
