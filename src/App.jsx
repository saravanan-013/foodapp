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
        <Routes>
          <Route path="/" element={
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
      </div>
    </Router>
  );
}

export default App;
