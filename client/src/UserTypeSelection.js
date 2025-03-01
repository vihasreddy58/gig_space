// UserTypeSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    if (type === 'freelancer') {
      navigate('/freelancer-signup');
    } else if (type === 'employer') {
      navigate('/employer-signup');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Select Your Account Type</h1>
      <button className="btn btn-primary mt-3" onClick={() => handleUserTypeSelection('freelancer')}>Freelancer</button>
      <button className="btn btn-secondary mt-3 ms-3" onClick={() => handleUserTypeSelection('employer')}>Employer</button>
    </div>
  );
};

export default UserTypeSelection;
