import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingCart from './ShoppingCart';

function UserHomePage() {
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleAddToCart = (dish) => {
    setCartItems([...cartItems, dish]);
  };

  const handlePlaceOrder = () => {
    // Place order logic goes here
    console.log('Placing order:', cartItems);
    setCartItems([]);

    // Show a toast notification
    toast.success('Order placed successfully!');
    
  };

  return (
    <div className="user-home-page">
      <ShoppingCart cartItems={cartItems} handlePlaceOrder={handlePlaceOrder} />
      <div className="dishes-list">
        <h3>Dishes</h3>
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              <span>{dish.name}</span>
              <span>${parseFloat(dish.price).toFixed(2)}</span>
              <button onClick={() => handleAddToCart(dish)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserHomePage;