import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Eprogress.css';

// Sample project data with ratings
const projectsData = [
  { id: 1, name: 'Project Alpha', deadline: '2024-09-30', progress: '50%', client: 'Client A', dueAmount: '$500', githubLink: 'https://github.com/project-alpha', rating: 4 },
  { id: 2, name: 'Project Beta', deadline: '2024-10-15', progress: '80%', client: 'Client B', dueAmount: '$300', githubLink: 'https://github.com/project-beta', rating: 3 },
];

// StarRating component integrated within the file
const StarRating = ({ rating }) => {
  const starArray = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {starArray.map(star => (
        <span key={star} className={star <= rating ? 'filled' : ''}>★</span>
      ))}
    </div>
  );
};

const Eprogress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const filteredProjects = projectsData.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactFreelancer = (clientName) => {
    alert(`Contacting ${clientName}`);
  };

  const handlePayment = () => {
    navigate('/payment'); // Navigate to the /payment route
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (testimonial.trim() && selectedProject) {
      setTestimonials([...testimonials, { project: selectedProject, text: testimonial }]);
      setTestimonial('');
      setSelectedProject('');
    }
  };

  return (
    <div className="my-projects">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="projects-list">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3 className="project-name">{project.name}</h3>
            </div>
            <p className="project-deadline">Deadline: {project.deadline}</p>
            <div className="progress-bar-container">
              <p className="progress-title">Progress:</p>
              <div className="progress-bar" style={{ width: project.progress }}></div>
            </div>
            <StarRating rating={project.rating} /> {/* Integrated StarRating component */}
            <p className="project-client">Contact Freelancer: {project.client}</p>
            <p className="project-due-amount">Remaining Due Amount: {project.dueAmount}</p>
            <div className="buttons-container">
              <a
                href={project.githubLink}
                className="github-link-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to GitHub
              </a>
              <button
                className="contact-client-btn"
                onClick={() => handleContactFreelancer(project.client)}
              >
                Contact Freelancer
              </button>
              <button
                className="contact-client-btn"
                onClick={() => handlePayment()}
              >
                Payment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <h3>Submit a Testimonial</h3>
        <form onSubmit={handleTestimonialSubmit}>
          <div className="form-group">
            <label htmlFor="projectSelect">Select Project:</label>
            <select
              id="projectSelect"
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
            >
              <option value="">Select a project</option>
              {projectsData.map(project => (
                <option key={project.id} value={project.name}>{project.name}</option>
              ))}
            </select>
          </div>
          <textarea
            rows="4"
            value={testimonial}
            onChange={e => setTestimonial(e.target.value)}
            placeholder="Write your testimonial here..."
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <div className="testimonials-list">
          {testimonials.length > 0 ? (
            testimonials.map((test, index) => (
              <div key={index} className="testimonial-item">
                <strong>{test.project}:</strong> {test.text}
              </div>
            ))
          ) : (
            <p>No testimonials yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eprogress;
