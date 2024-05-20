// src/UserSignin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


function UserSignin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    collegeName: '',
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, collegeName } = formData;

    // User authentication logic
    if (username === 'vijay' && password === '54321' && collegeName === 'cit') {
      // If authentication succeeds, navigate to UserHomePage
      navigate('/user-home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="user-signin-page">
      <h2>User Signin</h2>
      <form onSubmit={handleSubmit} className="user-signin-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          College Name:
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default UserSignin;
