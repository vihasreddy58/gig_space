import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaUserCircle, FaBell, FaEnvelope, FaCheckCircle, FaExclamationCircle, FaFlag, FaStar, FaTimes } from "react-icons/fa";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #fff;
    font-family: Arial, sans-serif;
    width: 100vw;
    overflow-x: hidden;
  }
`;

// Modal Component
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  button {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
      background-color: #218838;
    }
  }

  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
    &:hover {
      color: #dc3545;
    }
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContent>
        <FaTimes onClick={onClose} />
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

// EscrowCard Component
const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.4rem;
    color: #333;
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #FFD700;
  }
`;

const CardBody = styled.div`
  margin: 20px 0;
  font-size: 1rem;

  p {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: ${(props) => (props.isReleased ? "#28a745" : "#ffc107")};
    color: #fff;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
      background-color: ${(props) => (props.isReleased ? "#218838" : "#e0a800")};
    }
  }

  svg {
    font-size: 1.5rem;
    color: ${(props) => (props.isReleased ? "#28a745" : "#dc3545")};
  }
`;

const EscrowCard = ({ escrow, onUpdateEscrow }) => {
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPaymentReleaseOpen, setIsPaymentReleaseOpen] = useState(false);

  const handleDisputeOpen = () => setIsDisputeOpen(true);
  const handleDisputeClose = () => setIsDisputeOpen(false);

  const handleRatingOpen = () => setIsRatingOpen(true);
  const handleRatingClose = () => setIsRatingOpen(false);

  const handlePaymentReleaseOpen = () => setIsPaymentReleaseOpen(true);
  const handlePaymentReleaseClose = () => setIsPaymentReleaseOpen(false);

  const isReleased = escrow.status === "Released";
  const isDisputed = escrow.status === "Disputed";

  const handleConfirmRelease = () => {
    onUpdateEscrow(escrow.id, { status: "Released" });
    setIsPaymentReleaseOpen(false);
  };

  return (
    <CardWrapper>
      <CardHeader>
        <h3>{escrow.project}</h3>
        <span>{escrow.amount}</span>
      </CardHeader>

      <CardBody>
        <p>
          Client: <strong>{escrow.client}</strong>
        </p>
        <p>
          Freelancer: <strong>{escrow.freelancer}</strong>
        </p>
        <p>
          Deadline: <strong>{escrow.deadline}</strong>
        </p>
      </CardBody>

      <CardFooter isReleased={isReleased}>
        {isReleased ? (
          <>
            <button onClick={handleRatingOpen}>Rate Client</button>
            <FaCheckCircle />
          </>
        ) : isDisputed ? (
          <>
            <button onClick={handleDisputeOpen}>View Dispute</button>
            <FaFlag />
          </>
        ) : (
          <>
            <button onClick={handlePaymentReleaseOpen}>Withdraw Payment</button>
            <FaExclamationCircle />
          </>
        )}
      </CardFooter>

      {/* Dispute Modal */}
      <Modal isOpen={isDisputeOpen} onClose={handleDisputeClose}>
        <h2>Dispute Details</h2>
        <p>
          Reason for dispute: <strong>Freelancer missed the deadline.</strong>
        </p>
        <textarea rows="4" placeholder="Your response..."></textarea>
        <button>Submit Response</button>
      </Modal>

      {/* Rating Modal */}
      <Modal isOpen={isRatingOpen} onClose={handleRatingClose}>
        <h2>Rate the Client</h2>
        <div>
          <FaStar size={24} color="#FFD700" />
          <FaStar size={24} color="#FFD700" />
          <FaStar size={24} color="#FFD700" />
          <FaStar size={24} color="#FFD700" />
          <FaStar size={24} color="#ccc" />
        </div>
        <textarea rows="4"></textarea>
        <button>Submit Rating</button>
      </Modal>

      <Modal isOpen={isPaymentReleaseOpen} onClose={handlePaymentReleaseClose}>
        <h2>Confirm Payment Release</h2>
        <button onClick={handleConfirmRelease}>Confirm Withdraw</button>
      </Modal>
    </CardWrapper>
  );
};

const NewEscrowForm = ({ onAddEscrow }) => {
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    client: "",
    freelancer: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEscrow(formData);
    setFormData({
      project: "",
      amount: "",
      client: "",
      freelancer: "",
      deadline: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Escrow</h2>
      <input
        type="text"
        name="project"
        placeholder="Project Name"
        value={formData.project}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="client"
        placeholder="Client Name"
        value={formData.client}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="freelancer"
        placeholder="Freelancer Name"
        value={formData.freelancer}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="deadline"
        placeholder="Deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Escrow</button>
    </form>
  );
};

// EscrowDashboard Component
const DashboardWrapper = styled.section`
  padding: 50px 30px;
  max-width: 1200px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const EscrowCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const EscrowDashboard = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [escrows, setEscrows] = useState([
    {
      id: 1,
      project: "Website Development",
      amount: "$500",
      status: "In Escrow",
      client: "John Doe",
      freelancer: "Jane Smith",
      deadline: "September 15, 2024",
    },
    {
      id: 2,
      project: "Logo Design",
      amount: "$200",
      status: "Released",
      client: "Sarah Connor",
      freelancer: "Tom Harper",
      deadline: "August 22, 2024",
    },
    {
      id: 3,
      project: "Mobile App",
      amount: "$1200",
      status: "Disputed",
      client: "Elon Musk",
      freelancer: "Tony Stark",
      deadline: "July 30, 2024",
    },
  ]);
  const [isNewEscrowOpen, setIsNewEscrowOpen] = useState(false);

  const filteredEscrows = escrows.filter(
    (escrow) =>
      (filterStatus === "All" || escrow.status === filterStatus) &&
      escrow.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEscrow = (newEscrow) => {
    setEscrows([...escrows, { ...newEscrow, id: escrows.length + 1, status: "In Escrow" }]);
    setIsNewEscrowOpen(false);
  };

  const handleUpdateEscrow = (id, updatedData) => {
    setEscrows(escrows.map((escrow) => (escrow.id === id ? { ...escrow, ...updatedData } : escrow)));
  };

  return (
    <DashboardWrapper>
      <h2>Escrow Dashboard</h2>
      <button onClick={() => setIsNewEscrowOpen(true)}>Create New Escrow</button>

      <EscrowCardsWrapper>
        {filteredEscrows.map((escrow) => (
          <EscrowCard key={escrow.id} escrow={escrow} onUpdateEscrow={handleUpdateEscrow} />
        ))}
      </EscrowCardsWrapper>

      <Modal isOpen={isNewEscrowOpen} onClose={() => setIsNewEscrowOpen(false)}>
        <NewEscrowForm onAddEscrow={handleAddEscrow} />
      </Modal>
    </DashboardWrapper>
  );
};

export default EscrowDashboard;
