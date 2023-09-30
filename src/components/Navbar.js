// src/components/Navbar.js

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navbar(props) {
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    props.history.push('/login');
  }

  if (!token) return null; // Don't render the navbar if the user is not logged in

  return (
    <nav className="navbar">
      <div className="navbar-container"> 
        <div className="navbar-brand">FinanceApp</div>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/expenses">Expenses</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
