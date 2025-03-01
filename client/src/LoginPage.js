import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const LoginPage = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: userType }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', userType);

        if (userType === 'freelancer') {
          navigate('/fHome'); // Freelancer's home page
        } else if (userType === 'employer') {
          navigate('/eHome'); // Employer's home page
        }
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container" id="login-container">
      <div className="login-grid">
        <img
          src="images/44yrs.jpg"
          alt="Login"
          className="login-image"
        />
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="user" className="form-label">User</label>
            <select
              className="form-select"
              id="user"
              name="user"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled>Select your role...</option>
              <option value="freelancer">Freelancer</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mybutton">Login</button>
        </form>
        <div className="login-links">
          <div>
            Not a member? <Link to="/select-user-type" className="register-link">Create account</Link>
          </div>
          <div>
            <Link to="/forgotpassword" className="forgot-password-link">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
