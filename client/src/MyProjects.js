import React, { useState } from 'react';
import './MyProjects.css'; 

const projectsData = [
  { id: 1, name: 'Project Alpha', deadline: '2024-09-30', progress: '50%', client: 'Client A', hasCollaborators: false },
  { id: 2, name: 'Project Beta', deadline: '2024-10-15', progress: '80%', client: 'Client B', hasCollaborators: true },
];

const MyProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collaboratorFilter, setCollaboratorFilter] = useState('all'); // Collaborator filter state
  const [deadlineFilter, setDeadlineFilter] = useState('all'); // Deadline filter state

  // Function to handle collaborator filter change
  const handleCollaboratorFilterChange = (e) => {
    setCollaboratorFilter(e.target.value);
  };

  // Function to handle deadline filter change
  const handleDeadlineFilterChange = (e) => {
    setDeadlineFilter(e.target.value);
  };

  // Get today's date for comparison
  const today = new Date();

  // Filter based on deadline range
  const isWithinDeadlineRange = (deadline, filter) => {
    const projectDeadline = new Date(deadline);
    const oneWeek = new Date(today);
    oneWeek.setDate(today.getDate() + 7);

    if (filter === 'week') {
      return projectDeadline <= oneWeek;
    } else if (filter === 'month') {
      return projectDeadline.getMonth() === today.getMonth() && projectDeadline.getFullYear() === today.getFullYear();
    }
    return true;
  };

  // Filtered and searched projects based on filters and search term
  const filteredProjects = projectsData
    .filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(project => {
      if (collaboratorFilter === 'withCollaborators') {
        return project.hasCollaborators;
      } else if (collaboratorFilter === 'withoutCollaborators') {
        return !project.hasCollaborators;
      }
      return true;
    })
    .filter(project => isWithinDeadlineRange(project.deadline, deadlineFilter));

  const handleContactClient = (clientName) => {
    alert(`Contacting ${clientName}`);
  };

  const handleSubmitWork = (projectName) => {
    alert(`Submitting work for ${projectName}`);
  };

  const handleCollaborate = (projectName) => {
    // Redirect to the collaboration page (mock behavior here)
    window.location.href = `/collab`;
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

      {/* Filter section */}
      <div className="filter-bar">
        <select value={collaboratorFilter} onChange={handleCollaboratorFilterChange}>
          <option value="all">All Projects</option>
          <option value="withCollaborators">With Collaborators</option>
          <option value="withoutCollaborators">Without Collaborators</option>
        </select>

        <select value={deadlineFilter} onChange={handleDeadlineFilterChange}>
          <option value="all">All Deadlines</option>
          <option value="week">Next 7 Days</option>
          <option value="month">This Month</option>
        </select>
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
            <p className="project-client">Client: {project.client}</p>
            <div className="buttons-container">
              <button
                className="contact-client-btn"
                onClick={() => handleContactClient(project.client)}
              >
                Contact Client
              </button>
              <button
                className="submit-work-btn"
                onClick={() => handleSubmitWork(project.name)}
              >
                Submit Work
              </button>
              {project.hasCollaborators ? (
                <button
                  className="contact-collaborator-btn"
                  onClick={() => alert(`Contacting collaborator for ${project.name}`)}
                >
                  Contact Collaborator
                </button>
              ) : (
                <button
                  className="collaborate-btn"
                  onClick={() => handleCollaborate(project.name)}
                >
                  Collaborate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
