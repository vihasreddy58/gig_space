import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  body {
    background: url("https://images.unsplash.com/photo-1545446968-9baea3c7a4db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
    background-size: cover;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }

  #contact-form {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
    background-color: #ffffff;
    padding: 20px;
    width: 60%;
    max-width: 800px;
    margin: 50px auto;
    border-radius: 10px;
    position: relative;
    z-index: 1;
  }

  #contact-form h1 {
    color: #333;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif; /* Nice font for the title */
    font-size: 24px;
  }

  #contact-form input,
  #contact-form select,
  #contact-form textarea,
  #contact-form label {
    font-size: 16px;
    margin-bottom: 10px;
    width: 100%;
  }

  #contact-form input,
  #contact-form select,
  #contact-form textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 10px;
    background: #fafafa;
  }

  #contact-form input:focus,
  #contact-form select:focus,
  #contact-form textarea:focus {
    border-color: #007bff;
    background-color: #fff;
  }

  #contact-form textarea {
    height: 150px;
  }

  #contact-form #PJsubmit {
    cursor: pointer;
    width: auto; /* Shorter button width */
    border: none;
    background: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
  }

  #contact-form #PJsubmit:hover {
    background-color: #0056b3;
  }

  #contact-form #PJsubmit:active {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  #contact-form .required {
    font-weight: bold;
    color: #555;
  }

  @media only screen and (max-width: 768px) {
    #contact-form {
      width: 90%;
    }
  }
`;

const PostJobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState({
    title: '',
    date: '',
    description: '',
    jobType: '',
    budget: '',
    location: '',
    skillsRequired: '',
    applicationDeadline: '',
    jobCategory: '',
    experienceLevel: '',
    workFile: null, // Added state for file upload
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setJobs((prevJobs) => ({ ...prevJobs, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setJobs((prevJobs) => ({ ...prevJobs, workFile: file }));
    console.log('File selected: ', file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in jobs) {
      formData.append(key, jobs[key]);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/post-job', {
        method: 'POST',
        body: formData, 
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Job posted successfully!');
        console.log('Job posted:', data);
      } else {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        alert('Failed to post the job.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while posting the job.');
    }
  };
  
  
  

  if (loading) return <div>Loading...</div>;

  return (
    <Wrapper>
      <div id="contact-form">
        <h1>Post Your Job Here!!</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              <span className="required">Title: *</span>
              <input
                type="text"
                id="title"
                name="title"
                value={jobs.title}
                onChange={handleInputs}
                placeholder="Job Title"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="date">
              <span className="required">Date: *</span>
              <input
                type="date"
                id="date"
                name="date"
                value={jobs.date}
                onChange={handleInputs}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <span className="required">Description: *</span>
              <textarea
                id="description"
                name="description"
                placeholder="Please write your job description here."
                required
                value={jobs.description}
                onChange={handleInputs}
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="jobType">
              <span className="required">Job Type: *</span>
              <select
                id="jobType"
                name="jobType"
                value={jobs.jobType}
                onChange={handleInputs}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="budget">
              <span className="required">Budget: *</span>
              <input
                type="text"
                id="budget"
                name="budget"
                value={jobs.budget}
                onChange={handleInputs}
                placeholder="Budget"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="location">
              <span className="required">Location: *</span>
              <input
                type="text"
                id="location"
                name="location"
                value={jobs.location}
                onChange={handleInputs}
                placeholder="Location"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="skillsRequired">
              <span className="required">Skills Required: *</span>
              <input
                type="text"
                id="skillsRequired"
                name="skillsRequired"
                value={jobs.skillsRequired}
                onChange={handleInputs}
                placeholder="Skills Required"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="applicationDeadline">
              <span className="required">Application Deadline: *</span>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={jobs.applicationDeadline}
                onChange={handleInputs}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="jobCategory">
              <span className="required">Job Category: *</span>
              <input
                type="text"
                id="jobCategory"
                name="jobCategory"
                value={jobs.jobCategory}
                onChange={handleInputs}
                placeholder="Job Category"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="experienceLevel">
              <span className="required">Experience Level: *</span>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={jobs.experienceLevel}
                onChange={handleInputs}
                required
              >
                <option value="">Select Experience Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="workFile">
              <span className="required">Work File: *</span>
              <input
                id="workFile"
                type="file"
                name="workFile"
                accept=".pdf, .doc, .docx" // Accepting only document files
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div>
            <center>
            <input
              type="submit"
              id="PJsubmit"
              value="Submit"
            /></center>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default PostJobs;
