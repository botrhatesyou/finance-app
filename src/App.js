// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change Switch to Routes
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Categories from './components/CategoriesPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes> 
                    <Route path="/" element={<LandingPage />} /> 
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
