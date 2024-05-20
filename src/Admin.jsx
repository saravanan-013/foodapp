// src/Admin.jsx
import React from 'react';
import { Link } from 'react-router-dom';


function Admin() {
  return (
    <div className="admin-page">
      <div className="button-container">
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
        <Link to="/signin">
          <button className="btn">Signin</button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;
