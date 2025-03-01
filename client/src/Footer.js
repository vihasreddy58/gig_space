import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* For Employers Section */}
        <div className="footer-section">
          <h3>For Employers</h3>
          <a href="#find-freelancers">How to Find Freelancers</a>
          <a href="#shortlisting-tools">Smart Shortlisting Tools</a>
          <a href="#project-management">Project Management</a>
          <a href="#verified-talent">Verified Talent Pool</a>
          <a href="#contract-handling">Automated Contract Handling</a>
          <a href="#enterprise-solutions">Enterprise Solutions</a>
          <a href="#business-dashboard">Business Dashboard</a>
        </div>

        {/* For Freelancers Section */}
        <div className="footer-section">
          <h3>For Freelancers</h3>
          <a href="#find-work">How to Get Jobs</a>
          <a href="#job-matching">Job Matching System</a>
          <a href="#portfolio-tools">Portfolio Builder</a>
          <a href="#payment-protection">Payment Protection</a>
          <a href="#freelancer-community">Freelancer Community</a>
          <a href="#premium-membership">Freelancer Premium</a>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h3>Resources</h3>
          <a href="#learning-center">Learning Center</a>
          <a href="#industry-insights">Industry Insights</a>
          <a href="#webinars">Webinars & Workshops</a>
          <a href="#client-reviews">Client Reviews</a>
          <a href="#success-stories">Success Stories</a>
          <a href="#newsletter">Newsletter Signup</a>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h3>Company</h3>
          <a href="#about-us">About Us</a>
          <a href="#mission-vision">Our Mission & Vision</a>
          <a href="#leadership-team">Leadership Team</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press & Media</a>
          <a href="#partnerships">Partnerships</a>
          <a href="#trust-security">Trust & Security</a>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="footer-follow-us">
        <h3>Connect with Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 GigSpace</p>
        <p>
          <a href="#terms-of-service">Terms of Service</a> | <a href="#privacy-policy">Privacy Policy</a> | <a href="#cookie-settings">Cookie Settings</a> | <a href="#accessibility">Accessibility</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
