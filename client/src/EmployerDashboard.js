import React, { useState } from 'react';
import './EmployeeDashboard.css';

const sampleProposals = {
  'Project A': [
    { name: 'John Doe', category: 'Top Freelancer', estimatedAmount: 1500, details: 'Expert in Web Development with 5 years of experience.', rating: 4.5, proposal: 'I am excited to work on this project and bring my experience to achieve your goals.',img:"https://cdn.usegalileo.ai/sdxl10/20fa9cc1-bce4-4a08-93c1-32b2841ea662.png" },
    { name: 'Jane Smith', category: 'AI Recommended', estimatedAmount: 1200, details: 'AI and Machine Learning expert with 3 years of freelancing experience.', rating: 4.8, proposal: 'I can create optimized AI solutions for your business, improving efficiency.',img:"https://cdn.usegalileo.ai/stability/14b1f8ca-3970-44f1-9d43-44dad71f26bc.png" },
    { name: 'Mike Davis', category: 'Top Freelancer', estimatedAmount: 1400, details: 'Experienced frontend developer with a focus on React and Vue.js.', rating: 4.6, proposal: 'I will develop a user-friendly interface that enhances user experience.', img:"https://cdn.usegalileo.ai/sdxl10/c49ed045-0955-42f4-8b97-834cb53b7d2b.png" },
    { name: 'Sarah Lee', category: 'AI Recommended', estimatedAmount: 1350, details: 'Data analyst with expertise in statistical modeling and data visualization.', rating: 4.7, proposal: 'I will provide detailed data analysis and visualizations to help drive decisions.', img:"https://cdn.usegalileo.ai/sdxl10/cb3f8bde-fc23-4a55-b447-ca32e9cb7bee.png" }
  ],
  'Project B': [
    { name: 'Alice Johnson', category: 'Top Freelancer', estimatedAmount: 2000, details: 'Skilled in Full Stack Development with a focus on front-end technologies.', rating: 4.7, proposal: 'I will deliver a top-notch product with seamless UI and UX integration.',img:"https://cdn.usegalileo.ai/sdxl10/20fa9cc1-bce4-4a08-93c1-32b2841ea662.png"},
    { name: 'Bob Lee', category: 'New Freelancer', estimatedAmount: 800, details: 'Fresh graduate with strong skills in backend development and a passion for learning.', rating: 4.3, proposal: 'I am eager to contribute to your project and grow my skills further.',img:"https://cdn.usegalileo.ai/stability/14b1f8ca-3970-44f1-9d43-44dad71f26bc.png" },
    { name: 'Laura Martinez', category: 'Top Freelancer', estimatedAmount: 1700, details: 'Seasoned project manager with a track record of successful project delivery.', rating: 4.9, proposal: 'I will manage your project efficiently and ensure timely delivery.', img:"https://cdn.usegalileo.ai/sdxl10/c49ed045-0955-42f4-8b97-834cb53b7d2b.png"  },
    { name: 'David Kim', category: 'New Freelancer', estimatedAmount: 950, details: 'Junior developer with a focus on Python and Django development.', rating: 4.2, proposal: 'I will work diligently to build a robust backend for your application.', img:"https://cdn.usegalileo.ai/sdxl10/cb3f8bde-fc23-4a55-b447-ca32e9cb7bee.png" }
  ],
  'Project C': [
    { name: 'Chris Brown', category: 'AI Recommended', estimatedAmount: 1800, details: 'Experienced Data Scientist with a background in machine learning and data analytics.', rating: 4.9, proposal: 'I will provide advanced analytics and insights to help drive your business decisions.',img:"https://cdn.usegalileo.ai/sdxl10/20fa9cc1-bce4-4a08-93c1-32b2841ea662.png" },
    { name: 'Dana White', category: 'Top Freelancer', estimatedAmount: 1600, details: 'Seasoned digital marketer with expertise in SEO and content strategy.', rating: 4.6, proposal: 'I can enhance your online presence and drive traffic with proven strategies.',img:"https://cdn.usegalileo.ai/stability/14b1f8ca-3970-44f1-9d43-44dad71f26bc.png" },
    { name: 'Natalie Wilson', category: 'AI Recommended', estimatedAmount: 1650, details: 'Expert in computer vision with experience in developing image recognition models.', rating: 4.8, proposal: 'I will create advanced computer vision solutions tailored to your needs.', img:"https://cdn.usegalileo.ai/sdxl10/c49ed045-0955-42f4-8b97-834cb53b7d2b.png"  },
    { name: 'Steven Harris', category: 'Top Freelancer', estimatedAmount: 1500, details: 'Highly skilled backend developer specializing in Node.js and database management.', rating: 4.7, proposal: 'I will build scalable and efficient backend systems for your project.', img:"https://cdn.usegalileo.ai/sdxl10/cb3f8bde-fc23-4a55-b447-ca32e9cb7bee.png" }
  ],
  'Project D': [
    { name: 'Emily Clark', category: 'Top Freelancer', estimatedAmount: 1400, details: 'Highly skilled graphic designer with experience in branding and UI/UX design.', rating: 4.4, proposal: 'I will create visually appealing designs that align with your brand identity.',img:"https://cdn.usegalileo.ai/sdxl10/20fa9cc1-bce4-4a08-93c1-32b2841ea662.png" },
    { name: 'Franklin Adams', category: 'AI Recommended', estimatedAmount: 1100, details: 'AI researcher with expertise in natural language processing and data analysis.', rating: 4.7, proposal: 'I will develop AI models to enhance your product’s capabilities.',img:"https://cdn.usegalileo.ai/stability/14b1f8ca-3970-44f1-9d43-44dad71f26bc.png" },
    { name: 'Olivia Scott', category: 'Top Freelancer', estimatedAmount: 1550, details: 'Creative UI/UX designer with a focus on user-centered design principles.', rating: 4.6, proposal: 'I will design intuitive and engaging user interfaces for your application.', img:"https://cdn.usegalileo.ai/sdxl10/c49ed045-0955-42f4-8b97-834cb53b7d2b.png"  },
    { name: 'Ryan Thompson', category: 'AI Recommended', estimatedAmount: 1250, details: 'Specialist in predictive analytics and data modeling.', rating: 4.5, proposal: 'I will provide predictive analytics to help optimize your business strategies.', img:"https://cdn.usegalileo.ai/sdxl10/cb3f8bde-fc23-4a55-b447-ca32e9cb7bee.png" }
  ]
};


const ProjectDropdown = ({ setProject, projects }) => (
  <select onChange={(e) => setProject(e.target.value)} className="form-input w-full">
    {projects.map((project, index) => (
      <option key={index} value={project}>{project}</option>
    ))}
  </select>
);

// ProposalCard Component
const ProposalCard = ({ freelancer }) => {
  const [isHovered, setIsHovered] = useState(false); // State to control modal visibility

  // Handlers for hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="employee-card" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <img src={freelancer.img} alt="Freelancer" />
      <h3>{freelancer.name}</h3>
      <p>{freelancer.details}</p>
      <p><strong>Estimated Amount:</strong> ${freelancer.estimatedAmount}</p>
      <p><strong>Rating:</strong> {freelancer.rating}</p>

      {/* Display additional details on hover */}
      {isHovered && (
        <div className="extra-details">
          <p><strong>Proposal:</strong> {freelancer.proposal}</p>
          <p><strong>Details:</strong> {freelancer.details}</p>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ setProject, setCategory, setSearchTerm, setMinAmount, setMaxAmount, setMinRating }) => {
  const projects = Object.keys(sampleProposals); // Assuming the same sampleProposals for available projects

  return (
    <div className="other-gig-sidebar">
      <h2>Projects</h2>
      <ProjectDropdown setProject={setProject} projects={projects} />
      <input
        type="text"
        placeholder="Search freelancers..."
        className="form-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Min Amount"
        className="form-input"
        onChange={(e) => setMinAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Max Amount"
        className="form-input"
        onChange={(e) => setMaxAmount(e.target.value)}
      />
      <select
        className="form-input"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Top Freelancer">Top Freelancer</option>
        <option value="AI Recommended">AI Recommended</option>
      </select>
      <input
        type="text"
        placeholder="Min Rating"
        className="form-input"
        onChange={(e) => setMinRating(e.target.value)}
      />
    </div>
  );
};

const MainPart = ({ project, category, searchTerm, minAmount, maxAmount, minRating }) => {
  const [viewDetails, setViewDetails] = useState(null);

  const handleView = (freelancer) => {
    setViewDetails(freelancer);
  };

  const filteredProposals = sampleProposals[project]
    .filter((freelancer) =>
      (!category || freelancer.category === category) &&
      (!searchTerm || freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!minAmount || freelancer.estimatedAmount >= parseFloat(minAmount)) &&
      (!maxAmount || freelancer.estimatedAmount <= parseFloat(maxAmount)) &&
      (!minRating || freelancer.rating >= parseFloat(minRating))
    );

  return (
    <div className="other-gig-main-content">
      {filteredProposals.map((freelancer, index) => (
        <ProposalCard key={index} freelancer={freelancer} onView={handleView} />
      ))}
      {viewDetails && <Modal freelancer={viewDetails} onClose={() => setViewDetails(null)} />}
    </div>
  );
};

const CombinedComponent = () => {
  const [project, setProject] = useState('Project A');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [minRating, setMinRating] = useState('');

  return (
    <div className="other-gig-flex">
      <Sidebar
        setProject={setProject}
        setCategory={setCategory}
        setSearchTerm={setSearchTerm}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        setMinRating={setMinRating}
      />
      <MainPart
        project={project}
        category={category}
        searchTerm={searchTerm}
        minAmount={minAmount}
        maxAmount={maxAmount}
        minRating={minRating}
      />
    </div>
  );
};

// Modal Component for viewing proposal
const Modal = ({ freelancer, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{freelancer.name}'s Proposal</h3>
        <p><strong>Proposal:</strong> {freelancer.proposal}</p>
        <p><strong>Estimated Amount:</strong> ${freelancer.estimatedAmount}</p>
        <p><strong>Details:</strong> {freelancer.details}</p>
        <p><strong>Rating:</strong> {freelancer.rating}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default CombinedComponent;

