// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'
import { API_BASE_URL } from './config';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    // Fetch categories
    axios.get(`${API_BASE_URL}api/categories`, {  // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setCategories(response.data);
    });

    // Fetch expenses
    axios.get(`${API_BASE_URL}api/expenses`, {  // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExpenses(response.data);
    });
  }, [token]);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setErrorMessage('Please provide both start and end dates.');
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage('Please provide both start and end dates.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage('End date cannot be earlier than start date.');
      return;
    }
    // Filter expenses by date
    axios.get(`${API_BASE_URL}api/reports/filter?startDate=${startDate}&endDate=${endDate}`, {  // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExpenses(response.data);
      setErrorMessage('');
    });

    axios.get(`${API_BASE_URL}api/reports/total?startDate=${startDate}&endDate=${endDate}`, {  // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setTotalExpense(response.data);
    });
};

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">Dashboard</div>

      <div className="categories-section">
        <div className="categories-header">Categories</div>
        <div className="categories-list">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <div>{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="expenses-section">
        <div className="expenses-header">Expenses</div>
        <div>
          {expenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div>{expense.name}</div>
              <div>${expense.amount}</div>
              <div>{expense.date}</div>
              <div>{categories.find(cat => cat.id === expense.categoryId)?.name || 'Unknown Category'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">Filter Expenses</div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="filter-inputs">
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </label>
          <button className="filter-button" onClick={handleFilter}>Filter</button>
        </div>
        <div className="total-expense">Total Expense: ${totalExpense}</div>
      </div>
    </div>
  );
}

export default Dashboard;
