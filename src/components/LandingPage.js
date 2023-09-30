import React from 'react';
import '../styles/LandingPage.css'

function LandingPage() {
    return (
        <div className="landing-page">
            
            <div className="hero-section">
                <h1>Welcome to FinanceApp</h1>
                <p>Manage your finances with ease and clarity.</p>
                <p>Track your expenses, set budgets, and view detailed financial reports.</p>
                <p>Join our community and take control of your financial future.</p>
                <a href="/signup" className="btn-signup">Get Started</a>
                <a href="/login" className="btn-login">Login</a>
            </div>
        </div>
    );
}

export default LandingPage;
