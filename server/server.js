const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  // Optional in newer versions with express.json()
const Job = require('./models.js');  // Make sure you have this model correctly defined
const app = express();
const PORT = 5000;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing

// Enable CORS to allow all origins
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());  // Built-in JSON parser

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/freelancePlatform')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Filename with timestamp
  }
});

// Set up Multer middleware for file upload
const upload = multer({ storage: storage });

// Router for job-related API endpoints
const router = express.Router();

// POST job (with file upload)
router.post('/post-job', upload.single('workFile'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('File Data:', req.file);

  try {
    const newJob = new Job({
      ...req.body,
      workFile: req.file ? req.file.filename : '', // Store only filename in DB
    });

    const savedJob = await newJob.save();
    res.status(201).json({
      message: 'Job posted successfully',
      job: savedJob,
    });
  } catch (err) {
    console.error('Error in posting job:', err);
    res.status(400).json({ error: err.message });
  }
});

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log('Jobs fetched:', jobs);

    // Fetch all jobs from the collection and send them as a response
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Failed to fetch jobs from the server.' });
  }
});

router.post('/signup/freelancer', upload.single('resume'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, school, degreeType, projects, certifications } = req.body;
    const resume = req.file ? path.join(__dirname, 'uploads', req.file.filename).replace(/\\/g, '/') : null; // Convert path to forward slashes

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10); // 10 rounds of salt generation
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Set role as 'freelancer'
    const role = 'freelancer';

    // Create a new signup document
    const newSignup = new Freelancer1({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      school,
      degreeType,
      projects: JSON.parse(projects),
      certifications: JSON.parse(certifications),
      resume,
      role,
    });

    // Save to MongoDB
    await newSignup.save();

    res.status(201).json({ message: 'Freelancer signup data saved successfully!' });
  } catch (error) {
    console.error('Error saving freelancer signup data:', error);
    res.status(500).json({ message: 'Error saving freelancer signup data', error });
  }
});

router.post('/signup/employer', async (req, res) => {
  try {
    const { companyName, companyWebsite, contactEmail, contactPhone, username, password, industry, companySize, companyDescription, termsAccepted } = req.body;

    // Convert termsAccepted to boolean if it's a string ('on') or undefined
    const terms = termsAccepted === 'true';  // Check if the checkbox was checked

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10); // 10 rounds of salt generation
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new employer signup document
    const newEmployerSignup = new Employer1({
      companyName,
      companyWebsite,
      contactEmail,
      contactPhone,
      username,
      password: hashedPassword, // Store the hashed password
      companyProfile: {
        industry,
        companySize,
        companyDescription,
      },
      role: 'employer', // Always set the role as 'employer'
      termsAccepted: terms, // Store the terms accepted value
    });

    // Save to MongoDB
    await newEmployerSignup.save();

    res.status(201).json({ message: 'Employer signup data saved successfully!' });
  } catch (error) {
    console.error('Error saving employer signup data:', error);
    res.status(500).json({ message: 'Error saving employer signup data', error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user;

    // Validate role and find the user based on role
    if (role === 'freelancer') {
      user = await Freelancer1.findOne({ email: username });
    } else if (role === 'employer') {
      user = await Employer1.findOne({ username: username });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with minimal user information (excluding sensitive data like password)
    const { password: _, ...userData } = user.toObject(); // Exclude password from user data

    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Use the router for API requests
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
