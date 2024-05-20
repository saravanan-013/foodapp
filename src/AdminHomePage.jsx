// src/AdminHomePage.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminHomePage() {
  const [dishes, setDishes] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('https://foodapp-bcc0.onrender.com/api/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    const dishData = { name, price };

    try {
      const response = await fetch('https://foodapp-bcc0.onrender.com/api/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dishData),
      });

      if (!response.ok) {
        throw new Error('Failed to add dish');
      }

      const result = await response.json();
      setDishes([...dishes, result]);
      setName('');
      setPrice('');

      // Show success toast
      toast.success('Food item added successfully!');
    } catch (error) {
      console.error('Error adding dish:', error);
      toast.error('Failed to add dish');
    } 
  };

  const handleDeleteDish = async (id) => {
    try {
      const response = await fetch(`https://foodapp-bcc0.onrender.com/api/dishes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete dish');
      }

      setDishes(dishes?.filter((dish) => dish.id !== id));
      toast.info('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
      toast.error('Failed to delete dish');
    }
  };

  return (
    <div className="container">
      <h1>Admin Home Page</h1>
      <form onSubmit={handleAddDish}>
        <div>
          <label>
            Dish Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Dish Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Dish</button>
      </form>
      <h2>All Dishes</h2>
      <ul>
        {dishes?.map((dish) => (
          <li key={dish.id}>
            <span>{dish.name}</span>
            <span className="price">${dish.price}</span>
            <button onClick={() => handleDeleteDish(dish.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminHomePage;
