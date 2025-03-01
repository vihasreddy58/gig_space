import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user authentication and role from localStorage or API
    const checkLoginStatus = () => {
      return localStorage.getItem('isLoggedIn') === 'true';
    };

    const getUserRole = () => {
      return localStorage.getItem('userRole') || 'guest';
    };

    const loggedIn = checkLoginStatus();
    const role = getUserRole();

    console.log(`Logged in: ${loggedIn}, Role: ${role}`); // Debugging line

    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('guest');
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">GigSpace</Link>

        <div className="navbar" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {userRole === 'freelancer' ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/freelancer-leaderboard">Leaderboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/freelancer-dashboard">Filter</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/discussion">Support</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/myprojects">My Projects</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/escrow">Escrow</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <div className="nav-link dropdown-toggle profile-btn" role="button" data-bs-toggle="dropdown">
                        <FaUserCircle className="profile-icon" /> My Profile
                      </div>
                      <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    </li>
                  </>
                ) : userRole === 'employer' ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/employer-dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/post-jobs">Post Work</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/eprogress">Progress</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <div className="nav-link dropdown-toggle profile-btn" role="button" data-bs-toggle="dropdown">
                        <FaUserCircle className="profile-icon" /> My Profile
                      </div>
                      <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    </li>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">Contact Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link login-btn" to="/login">Login / Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
