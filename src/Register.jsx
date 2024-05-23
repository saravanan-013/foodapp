// src/Register.jsx
import React, { useState } from 'react';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    collegeName: '',
    canteenName: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
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
          <label>
            Canteen Name:
            <input
              type="text"
              name="canteenName"
              value={formData.canteenName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
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

export default Register;
