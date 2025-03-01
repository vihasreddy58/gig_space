import React, { useState } from 'react';
import './styles.css';  // Custom CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const SignupForm = () => {
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState([{ name: '', link: '' }]);
  const [certifications, setCertifications] = useState([{ name: '', proof: '' }]);
  const [resume, setResume] = useState(null);

  // Form fields states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [degreeType, setDegreeType] = useState('');

  const navigate = useNavigate();

  const handleNext = () => setPage((prevPage) => prevPage + 1);
  const handlePrevious = () => setPage((prevPage) => prevPage - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for file uploads
    const formData = new FormData();

    // Append text data
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('school', school);
    formData.append('degreeType', degreeType);

    // Append projects and certifications (as JSON strings)
    formData.append('projects', JSON.stringify(projects));
    formData.append('certifications', JSON.stringify(certifications));

    // Append files
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup/freelancer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Error submitting form. Check the console for more details.');
    }
  };

  const handleAddProject = () => setProjects([...projects, { name: '', link: '' }]);
  const handleAddCertification = () => setCertifications([...certifications, { name: '', proof: '' }]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  // Remove a certification
  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  return (
    <main>
      <section className="signup-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card mb-4">
                <div className="card-body">
                  <h1 className="text-center mb-4">Freelancer Sign Up</h1>
                  <form id="registrationForm" onSubmit={handleSubmit}>
                    {page === 1 && (
                      <div>
                        <h3>Personal Details</h3>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName" className="form-label">First Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">Password*</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="country" className="form-label">Country*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="country"
                              name="country"
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="username" className="form-label">Username*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <label className="form-check-label">Terms & Conditions</label>
                            <div>
                              <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                className="form-check-input"
                              />
                              <label htmlFor="terms" className="form-check-label ms-2">I agree</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {page === 2 && (
                      <div>
                        <h3>Education Details</h3>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="school" className="form-label">School/College*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="school"
                              value={school}
                              onChange={(e) => setSchool(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="degreeType" className="form-label">Graduation Degree Type*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="degreeType"
                              value={degreeType}
                              onChange={(e) => setDegreeType(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="major" className="form-label">Major*</label>
                            <input type="text" className="form-control" id="major" name="major" />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="gradYear" className="form-label">Graduation Year*</label>
                            <input type="text" className="form-control" id="gradYear" name="gradYear" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="cgpa" className="form-label">CGPA*</label>
                          <input type="text" className="form-control" id="cgpa" name="cgpa" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="resume" className="form-label">Resume</label>
                          <input
                            type="file"
                            className="form-control"
                            id="resume"
                            name="resume"
                            onChange={(e) => setResume(e.target.files[0])}
                          />
                        </div>
                      </div>
                    )}

                    {page === 3 && (
                      <div>
                        <h3>Experience & Projects</h3>
                        <div className="mb-3">
                          <label htmlFor="experience" className="form-label">Experience</label>
                          <textarea className="form-control" id="experience" name="experience" rows="3"></textarea>
                        </div>

                        <h4>Projects</h4>
                        {projects.map((project, index) => (
                          <div key={index} className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Project Name"
                              value={project.name}
                              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Project Link"
                              value={project.link}
                              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-danger mt-2"
                              onClick={() => handleRemoveProject(index)}
                            >
                              Remove Project
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-primary mb-3"
                          onClick={handleAddProject}
                        >
                          Add Project
                        </button>

                        <h4>Certifications</h4>
                        {certifications.map((cert, index) => (
                          <div key={index} className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Certification Name"
                              value={cert.name}
                              onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Certification Proof"
                              value={cert.proof}
                              onChange={(e) => handleCertificationChange(index, 'proof', e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-danger mt-2"
                              onClick={() => handleRemoveCertification(index)}
                            >
                              Remove Certification
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-primary mb-3"
                          onClick={handleAddCertification}
                        >
                          Add Certification
                        </button>
                      </div>
                    )}

                    <div className="form-navigation">
                      {page > 1 && (
                        <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                          Previous
                        </button>
                      )}
                      {page < 3 && (
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                          Next
                        </button>
                      )}
                      {page === 3 && (
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignupForm;
