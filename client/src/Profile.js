import React from 'react';
import './prof1.css';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <>
      <div className="prof_cont">
        <div className="image-text">
          <img src="profile.png" alt="Picture" className="rounded-image" />
          <div className="img_txt">
            <h2>P Santosh Babu</h2>
            <p>Web Developer</p>
          </div>
          <div className="social-links">
            <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" className="icon" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="icon" alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="rank">
          <div className="ranking">
            <span><b>Rank:</b></span>
            <span>1234</span>
          </div>
          <div className="ranking">
            <span><b>Task Rating:</b></span>
            <span>1234</span>
          </div>
          <div className="ranking">
            <span><b>Overall:</b></span>
            <span>1234</span>
          </div>
        </div>
        <div className="buttons">
        <div className="edit-profile">
          <Link to="/edit"><button className="btn_ch">Edit Profile</button></Link>
        </div>        </div>
      </div>

      <div className="remain">
        <div className="left-panel">
          <div className="container-2">
            <h2>Educational Details</h2>
            {[1, 2, 3].map((item) => (
              <div className="image-text-2" key={item}>
                <img src="cbit.png" alt="Picture" className="rounded-image" />
                <div className="content">
                  <h3>CBIT</h3>
                  <p>BE</p>
                  <p>2022-26</p>
                  <h4>Computer Science And Engineering</h4>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <br />
          <div className="container-2">
            <h2>Skills</h2>
            {[1, 2, 3].map((item) => (
              <div className="image-text-2" key={item}>
                <div className="content">
                  <h3>Machine Learning</h3>
                  <p>NPTEL</p>
                  <p>2024</p>
                  <h4>Introduction to machine learning</h4>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <br />
          <div className="container-2">
            <h2>Projects Completed On this Site</h2>
            {[1, 2, 3].map((item) => (
              <div className="image-text-2" key={item}>
                <div className="content">
                  <h3>Database Schema for Students Attendance In CBIT</h3>
                  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  </p>
                  <p>Mar 2024-Dec 2024</p>
                  <h4>Payment Deatils</h4>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          <div className="Lang container-3">
            <h3>Languages</h3>
            <ul>
              <li>Hindi: <span>Basic</span></li>
              <li>Telugu: <span>Basic</span></li>
              <li>English: <span>Basic</span></li>
            </ul>
          </div>
          
          <br />
          <div className="container-3">
            <h2>Your Skills Pie</h2>
            <img src="/skills_barchart.svg" alt="Skills Bar Chart" />          </div>
          <br />
          <div className="container-3">
            <h2>Any Features for development</h2>
            <img src="logo.svg" alt="Features" />
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;