import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/admin-home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Signin</h2>
        <form onSubmit={handleSubmit} className="signin-form">
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
          <button type="submit" className="btn submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
