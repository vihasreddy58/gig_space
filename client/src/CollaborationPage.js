import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './CollaborationPage.css';

const CollaborationPage = () => {
  const [collaborators, setCollaborators] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [email, setEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  const addCollaborator = (data) => {
    const { name, email, contribution } = data;
    setCollaborators([...collaborators, { name, email, contribution }]);
    reset();
  };

  const sendCollaborationRequest = () => {
    if (email) {
      alert(`Collaboration request sent to ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const openPaymentModal = (collaborator) => {
    setSelectedCollaborator(collaborator);
    setModalOpen(true);
  };

  const closePaymentModal = () => {
    setModalOpen(false);
    setSelectedCollaborator(null);
  };

  const handlePaymentSubmit = () => {
    alert(`Payment made to ${selectedCollaborator.name}`);
    closePaymentModal();
  };

  const submitCollaboration = () => {
    alert("Collaboration details submitted!");
  };

  return (
    <div className="collaboration-page">
      <h2>Freelancer Collaboration Setup</h2>

      {/* Form to add collaborators */}
      <form onSubmit={handleSubmit(addCollaborator)} className="collaborator-form">
        <div className="input-group">
          <label>Name:</label>
          <input {...register("name")} required />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input {...register("email")} required />
        </div>
        <div className="input-group">
          <label>Contribution (%):</label>
          <input type="number" {...register("contribution")} required />
        </div>
        <button type="submit" className="add-btn">Add Collaborator</button>
      </form>

      {/* Section to send collaboration request */}
      <div className="collaboration-request">
        <h3>Send Collaboration Request</h3>
        <div className="request-input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter freelancer's email"
            required
          />
          <button className="send-request-btn" onClick={sendCollaborationRequest}>
            Send Request
          </button>
        </div>
      </div>

      {/* List of collaborators */}
      <div className="collaborators-list">
        <h3>Collaborators</h3>
        <ul>
          {collaborators.map((collab, index) => (
            <li key={index} className="collaborator-item">
              <span>{collab.name}</span> ({collab.email}) - {collab.contribution}%
              <button className="pay-now-btn" onClick={() => openPaymentModal(collab)}>Pay Now</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit collaboration */}
      {collaborators.length > 0 && (
        <button className="submit-btn" onClick={submitCollaboration}>
          Submit Collaboration & Handle Payment
        </button>
      )}

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Pay {selectedCollaborator?.name}</h3>
            <form className="payment-form">
              <div className="input-group">
                <label>Card Number:</label>
                <input type="text" placeholder="Enter card number" required />
              </div>
              <div className="input-group">
                <label>Expiry Date:</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="input-group">
                <label>CVV:</label>
                <input type="text" placeholder="CVV" required />
              </div>
              <button type="button" className="submit-payment-btn" onClick={handlePaymentSubmit}>Submit Payment</button>
              <button type="button" className="close-btn" onClick={closePaymentModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPage;
