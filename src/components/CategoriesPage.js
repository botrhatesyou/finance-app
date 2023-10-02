import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Categories.css'
import { API_BASE_URL } from './config';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); 
  const token = localStorage.getItem('token');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/expenses`, { // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setExpenses(response.data);
    });
  }, [token]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/categories`, { // Use the base URL
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setCategories(response.data);
    });
  }, [token]);

  const handleAddCategory = () => {
    if (!name) {
        setErrorMessage('Category name is required.');
        return;
    }

    const category = {
        name
    };
    axios.post(`${API_BASE_URL}/api/categories`, category, { // Use the base URL
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        setCategories([...categories, response.data]);
        setName('');
        setErrorMessage('');
    });
};

const handleUpdateCategory = (categoryId) => {
  if (!name) {
      setErrorMessage('Category name is required.');
      return;
  }

  const category = {
      name
  };
  axios.put(`${API_BASE_URL}/api/categories/${categoryId}`, category, { // Use the base URL
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then(response => {
      const updatedCategories = categories.map(cat => cat.id === categoryId ? response.data : cat);
      setCategories(updatedCategories);
      setEditingCategory(null);
      setName('');
      setErrorMessage('');
  });
};

const handleDeleteCategory = (categoryId) => {
  const isCategoryUsed = expenses.some(expense => expense.categoryId === categoryId);

  if (isCategoryUsed) {
      setErrorMessage('This category is associated with one or more expenses and cannot be deleted.');
      return;
  }

  axios.delete(`${API_BASE_URL}/api/categories/${categoryId}`, { // Use the base URL
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then(() => {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      setCategories(updatedCategories);
  });
};

  

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {editingCategory ? (
        <div className="edit-category-section">
          <h3 className="section-title">Edit Category</h3>
          <input className="category-input" value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
          <button className="update-btn" onClick={() => handleUpdateCategory(editingCategory.id)}>Update Category</button>
        </div>
      ) : (
        <div className="add-category-section">
          <h3 className="section-title">Add Category</h3>
          <input className="category-input" value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
          <button className="add-btn" onClick={handleAddCategory}>Add Category</button>
        </div>
      )}

      <h3 className="list-title">Category List</h3>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <span className="category-name">{category.name}</span>
            <div className="category-actions">
              <button className="edit-btn" onClick={() => {
                if (editingCategory && editingCategory.id === category.id) {
                  setEditingCategory(null);
                  setName('');
                } else {
                  setEditingCategory(category);
                  setName(category.name);
                }
              }}>
                {editingCategory && editingCategory.id === category.id ? 'Cancel' : 'Edit'}
              </button>
              <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
