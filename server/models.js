const mongoose = require('mongoose');

// Define Job Schema
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  jobType: { type: String, required: true }, // Fixed the issue
  budget: { type: String, required: true },
  location: { type: String, required: true },
  skillsRequired: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  jobCategory: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  workFile: { type: String }, // Store file path or URL
});


const freelancer1Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  school: String,
  degreeType: String,
  projects: [
    {
      name: String,
      link: String,
    },
  ],
  certifications: [
    {
      name: String,
      proof: String,
    },
  ],
  resume: String,
  role: {
    type: String,
    default: 'freelancer', // Default value for role is 'freelancer'
  },
});

// Employer1 Schema for Signup and Login
const employer1Schema = new mongoose.Schema({
  companyName: String,
  companyWebsite: String,
  contactEmail: String,
  contactPhone: String,
  username: String,
  password: String,
  companyProfile: {
    industry: String,
    companySize: String,
    companyDescription: String,
  },
  role: {
    type: String,
    default: 'employer', // Default value for role is 'employer'
  },
  termsAccepted: Boolean, // Track if terms are accepted
});

const Freelancer1 = mongoose.model('freelancer1', freelancer1Schema);
const Employer1 = mongoose.model('employer1', employer1Schema);

// Create models
const Job = mongoose.model('Job', JobSchema);


module.exports = {Freelancer1,Employer1,Job}; 