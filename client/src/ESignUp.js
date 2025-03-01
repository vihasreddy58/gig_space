import React, { useState } from "react";
import './styles.css';  // Custom CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection
import axios from 'axios';  // Import axios for API requests

const EmployerSignupForm = () => {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsite: "",
        contactEmail: "",
        contactPhone: "",
        industry: "",
        companySize: "",
        companyDescription: "",
        username: "",
        password: "",
        confirmPassword: "",
        terms: false
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        if (page === 1 && !validateCompanyDetails()) {
            setError("Please fill all required fields in the company details section.");
            return;
        }
        if (page === 2 && !validateAccountInfo()) {
            setError("Please fill all required fields in the account information section.");
            return;
        }
        if (page === 3 && !validateCompanyProfile()) {
            setError("Please fill all required fields in the company profile section.");
            return;
        }
        setError("");  // Clear error message if validation passes
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevious = () => setPage(prevPage => prevPage - 1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/signup/employer', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data); // Handle success response
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error submitting form:', error);
            setError("Error submitting form. Please try again.");
        }
    };

    // Validation for Company Details
    const validateCompanyDetails = () => {
        const { companyName, companyWebsite, contactEmail, contactPhone } = formData;
        return companyName && companyWebsite && contactEmail && contactPhone;
    };

    // Validation for Account Information
    const validateAccountInfo = () => {
        const { username, password, confirmPassword } = formData;
        return username && password && confirmPassword && password === confirmPassword;
    };

    // Validation for Company Profile
    const validateCompanyProfile = () => {
        const { industry, companySize } = formData;
        return industry && companySize;
    };

    return (
        <main>
            <section className="signup-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h1 className="text-center mb-4">Employer Sign Up</h1>
                                    {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}
                                    <form id="registrationForm" onSubmit={handleSubmit}>
                                        {page === 1 && (
                                            <div>
                                                <h3>Company Details</h3>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="companyName" className="form-label">Company Name*</label>
                                                        <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="companyWebsite" className="form-label">Company Website*</label>
                                                        <input type="url" className="form-control" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="contactEmail" className="form-label">Contact Email*</label>
                                                        <input type="email" className="form-control" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="contactPhone" className="form-label">Contact Phone*</label>
                                                        <input type="tel" className="form-control" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mb-3">
                                                        <label className="form-check-label">Terms & Conditions</label>
                                                        <div>
                                                            <input type="checkbox" id="terms" name="terms" className="form-check-input" checked={formData.terms} onChange={handleChange} />
                                                            <label htmlFor="terms" className="form-check-label ms-2">I agree</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {page === 2 && (
                                            <div>
                                                <h3>Account Information</h3>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="username" className="form-label">Username*</label>
                                                        <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="password" className="form-label">Password*</label>
                                                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
                                                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {page === 3 && (
                                            <div>
                                                <h3>Company Profile</h3>
                                                <div className="mb-3">
                                                    <label htmlFor="industry" className="form-label">Industry*</label>
                                                    <input type="text" className="form-control" id="industry" name="industry" value={formData.industry} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="companySize" className="form-label">Company Size*</label>
                                                    <input type="text" className="form-control" id="companySize" name="companySize" value={formData.companySize} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="companyDescription" className="form-label">Company Description</label>
                                                    <textarea className="form-control" id="companyDescription" name="companyDescription" rows="3" value={formData.companyDescription} onChange={handleChange}></textarea>
                                                </div>
                                            </div>
                                        )}

                                        <div className="d-flex justify-content-between">
                                            {page > 1 && <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>}
                                            {page < 3 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
                                            
                                            {page === 3 && <button type="submit" className="btn btn-success">Submit</button>}
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

export default EmployerSignupForm;
