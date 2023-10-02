import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Expenses.css'
import { API_BASE_URL } from './config';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState(undefined);
  const [notes, setNotes] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_BASE_URL}api/expenses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExpenses(response.data);
    });

    axios.get(`${API_BASE_URL}api/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setCategories(response.data);
      if (response.data.length > 0) {
        setCategoryId(response.data[0].id); // Set the first category as default
      }
    });
  }, [token]);

  const handleAddExpense = () => {
    if (!name || !amount || !date || !categoryId) {
      setErrorMessage('All fields are required.');
      return;
    }

    const expense = {
      name,
      amount,
      date,
      categoryId,
      notes
    };

    axios.post(`${API_BASE_URL}api/expenses`, expense, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExpenses([...expenses, response.data]);
      setName('');
      setAmount('');
      setDate('');
      setCategoryId(categories[0].id);
      setNotes('');
      setErrorMessage(''); // Clear the error message after successful addition
    });
  };

  const handleUpdateExpense = (expenseId) => {
    const expense = {
      name,
      amount,
      date,
      categoryId,
      notes
    };
    axios.put(`${API_BASE_URL}api/expenses/${expenseId}`, expense, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      const updatedExpenses = expenses.map(exp => exp.id === expenseId ? response.data : exp);
      setExpenses(updatedExpenses);
      setEditingExpense(null);
      setName('');
      setAmount('');
      setDate('');
      setCategoryId(categories[0].id);
      setNotes('');
    });
  };

  const handleDeleteExpense = (expenseId) => {
    axios.delete(`${API_BASE_URL}api/expenses/${expenseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      const updatedExpenses = expenses.filter(exp => exp.id !== expenseId);
      setExpenses(updatedExpenses);
    });
  };


return (
  <div className='allofit'>
    <h2>Expenses</h2>

    {errorMessage && <p className="error">{errorMessage}</p>}

    {editingExpense ? (
      <div>
      <h3>Edit Expense</h3>
      <input className="expense-name-input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input className="expense-amount-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <input className="expense-date-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
      <select className="expense-category-select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
        {categories.map(category => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
      </select>
      <textarea className="expense-notes-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes"></textarea>
      <button onClick={() => handleUpdateExpense(editingExpense.id)} className='add-expense'>Update Expense</button>
    </div>
    ) : (
      <div>
        <h3>Add Expense</h3>
        <input className="expense-name-input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className="expense-amount-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <input className="expense-date-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select className="expense-category-select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          {categories.map(category => (
              <option key={category.id} value={category.id}>
                  {category.name}
              </option>
          ))}
        </select>
        <textarea className="expense-notes-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes"></textarea>
        <button onClick={handleAddExpense} className='add-expense'>Add Expense</button>
      </div>
    )}

      <h3>Expense List</h3>
      <ul>
      {expenses.map(expense => (
        <li key={expense.id}>
          {expense.name} - ${expense.amount} on {expense.date} for {categories.find(cat => cat.id === expense.categoryId)?.name || 'Unknown Category'}
          <br />
          Notes: {expense.notes}
          {editingExpense && editingExpense.id === expense.id ? (
            <button onClick={() => {
              setEditingExpense(null);
              setName('');
              setAmount('');
              setDate('');
              setCategoryId(categories[0]?.id);
              setNotes('');
            }} className='cancel-edit'>Cancel</button>
          ) : (
            <button onClick={() => {
              setEditingExpense(expense);
              setName(expense.name);
              setAmount(expense.amount);
              setDate(expense.date);
              setCategoryId(expense.categoryId);
              setNotes(expense.notes || '');
            }} className='edit-button'>Edit</button>
          )}
          <button onClick={() => handleDeleteExpense(expense.id)} className='delete-button'>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Expenses;

