import React from 'react';
import './Home.css';
import Image2 from './image.png';

const Home = () => {
  return (
    <div className="hero-section">
      <video className="background-video" autoPlay muted loop>
        <source src=".\..\video.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Unlock Global Remote Opportunities</h1>
        <p>
          At GigSpace, we connect you with the best remote jobs and freelance gigs worldwide. 
          Discover your next project or full-time remote role tailored to your skills and interests. 
          Whether you’re looking for a short-term gig or a career shift, explore endless possibilities 
          and take your career to the next level with us.
        </p>
        <button className="about-btn">Learn More</button>
      </div>
      {/*<div className="hero-image">
        <img 
          className="image" 
          src={Image2} 
          alt="Remote Work Illustration"
          style={{ width: '150%', maxWidth: '800px', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>}
      {/* Fireworks elements */}
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
    </div>
  );
};

export default Home;
