  // src/UserAuthentication.jsx
  import React from 'react';
  import { Link } from 'react-router-dom';


  function UserAuthentication() {
    return (
      <div className="user-authentication-page">
      
        <div className="button-container">
          <Link to="/user-signin">
            <button className="btn">Signin</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Signup</button>
          </Link>
        </div>
      </div>
    );
  }

  export default UserAuthentication;
