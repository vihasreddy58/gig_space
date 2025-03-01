import React from 'react';
import process from 'process';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import EmployerSignupForm from './ESignUp';
import SignupForm from './FSignUp';
import PostJobs from './PostJobs';
import FreelancerLeaderboard from './FreelancerLeaderboard';
import EmployerDashboard from './EmployerDashboard';
import UserTypeSelection from './UserTypeSelection';
import Filter from './Filter'; 
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import MyProjects from './MyProjects';
import EscrowDashboard from './Escrow';
import Eprogress from './Eprogress';
import Payment from './Payment'
import CollaborationPage from './CollaborationPage'
import PaymentComponent from './PaymentComponent'
import Discussion from './Discussion';
import ProfilePage from './Profile';
import DetailsBlocks from './edit';
import MentorshipPage from './Mentorship';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/fHome" element={<><Navbar /><Home /></>} /> 
          <Route path="/eHome" element={<><Navbar /><Home /></>} />  {/* Home page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employer-signup" element={<><Navbar /><EmployerSignupForm /></>} />
          <Route path="/freelancer-signup" element={<><Navbar /><SignupForm /></>}/>
          <Route path="/post-jobs" element={<><Navbar /><PostJobs  /></>} />
          <Route path="/employer-dashboard" element={<><Navbar /><EmployerDashboard/></>}/>
          <Route path="/freelancer-leaderboard" element={<><Navbar /><FreelancerLeaderboard /></>} />
          <Route path="/freelancer-dashboard" element={<><Navbar /><Filter /></>} />
          <Route path="/select-user-type" element={<><Navbar /><UserTypeSelection /></>} />
          <Route path="/myprojects" element={<><Navbar /><MyProjects /></>} />
          <Route path="/escrow" element={<><Navbar /><EscrowDashboard /></>} />
          <Route path="/eprogress" element={<><Navbar /><Eprogress /></>} />
          <Route path="/discussion" element={<><Navbar /><Discussion /></>} />
          <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
          <Route path="/edit" element={<><Navbar /><DetailsBlocks /></>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/collab" element={<><CollaborationPage />
            <PaymentComponent /></>} />
        </Routes>
              </div>
    </Router>
  );
};

export default App;
