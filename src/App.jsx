// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Admin';
import Register from './Register';
import Signin from './Signin';
import UserAuthentication from './UserAuthentication';
import Signup from './Signup';
import UserSignin from './UserSignin';
import AdminHomePage from './AdminHomePage';
import UserHomePage from './UserHomePage';
import './App.css';

function App() {
  const [dishes, setDishes] = useState([]); // State to hold dishes data
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <header className="App-header">
          <h1>College Canteen</h1>
          <nav>
 
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <div className="home-container">
              <h2>Welcome to College Canteen Food Ordering</h2>
              <p>Order delicious meals from the comfort of your dorm!</p>
              <p>Whether you're craving something spicy, sweet, or savory, we've got you covered. Enjoy your favorite dishes with just a few clicks!</p>
              <div className="button-container">
                <Link to="/admin">
                  <button className="btn admin-btn">Admin</button>
                </Link>
                <Link to="/user-authentication">
                  <button className="btn user-btn">User</button>
                </Link>
                {/* Link to ShoppingCartPage */}
                {/* <Link to="/cart">
                  <button className="btn cart-btn">Cart</button>
                </Link> */}
              </div>
            </div>
          } />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-signin" element={<UserSignin />} />
          <Route path="/admin-home" element={<AdminHomePage setDishes={setDishes} />} />
          <Route path="/user-home" element={<UserHomePage dishes={dishes} />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2024 College Canteen. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
