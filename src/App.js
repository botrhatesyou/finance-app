// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/expenses" component={Expenses}/>
                    <Route path="/categories" component={Categories}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
