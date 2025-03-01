import React, { useState, useEffect } from 'react';
import './Filter.css';
import axios from 'axios';

const Filter = () => {
  const [jobs, setJobs] = useState([]); // For storing fetched jobs
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    searchQueryInput: "",
    title: "all",
    category: [],
    postedTime: "",
    duration: "All Durations",
  });
  const [selectedJob, setSelectedJob] = useState(null); // To store the selected job for "See More"

  // Fetch jobs from backend on component load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); 
        console.log(response.data); // Adjust API path if necessary
        setJobs(response.data);
        setFilteredJobs(response.data); // Initially show all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const updateFilterValue = (event) => {
    const { name, value, type, checked } = event.target;
    if (filters.searchQueryInput) {
      tempJobs = tempJobs.filter((job) =>
        job.title.toLowerCase().includes(filters.searchQueryInput.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchQueryInput.toLowerCase())
      );
    }
    
    if (name === "category") {
      const newCategory = checked
        ? [...filters.category, value]
        : filters.category.filter((cat) => cat !== value);
      setFilters({ ...filters, category: newCategory });
    } else if (name === "postedTime") {
      setFilters({ ...filters, postedTime: value });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  useEffect(() => {
    let tempJobs = [...jobs];

    if (filters.category.length > 0) {
      tempJobs = tempJobs.filter((job) => filters.category.includes(job.jobCategory));
    }

    if (filters.title !== "all") {
      tempJobs = tempJobs.filter((job) => job.jobCategory === filters.title);
    }

    if (filters.postedTime) {
      tempJobs = tempJobs.filter((job) => job.date === filters.postedTime);
    }

    if (filters.duration !== "All Durations") {
      tempJobs = tempJobs.filter((job) => job.duration === filters.duration);
    }

    setFilteredJobs(tempJobs);
  }, [filters, jobs]);

  const resetFilters = () => {
    setFilters({
      searchQueryInput: "",
      title: "all",
      category: [],
      postedTime: "",
      duration: "All Durations",
    });
  };

  const categoryData = ["Writing & Translation","Technical", "Programming & Development", "Business & Finance", "Others", "Design", "Marketing"];

  // Handle the "See More" button click
  const handleSeeMoreClick = (job) => {
    if (selectedJob && selectedJob._id === job._id) {
      setSelectedJob(null); // If the same job is clicked again, hide details
    } else {
      setSelectedJob(job); // Show the details of the clicked job
    }
  };

  return (
    <div className="wrapper">
      <article>
        <div className="findjobs">
          <div className="filter">
            <h1 id="filter-title">Filter by:</h1>
            <div id="divider-h"></div>
            <form>
              <div className="cate-jobs">
                <p><b>Category:</b></p>
                {["Writing", "Development", "Technical", "Finance", "Design", "Marketing", "Others"].map((category) => (
                  <label key={category} className="cate-jobs-p">
                    <input
                      type="checkbox"
                      name="category"
                      value={category}
                      onChange={updateFilterValue}
                      checked={filters.category.includes(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
              <hr />
              <div className="cate-duration filter-title">
                <p><b>Title:</b></p>
                <select id="cate-post-time" name="title" onChange={updateFilterValue} value={filters.title}>
                  <option value="all">All</option>
                  {categoryData.map((curElem, index) => (
                    <option key={index} value={curElem}>{curElem}</option>
                  ))}
                </select>
              </div>
              <hr />
              <div className="cate-time">
                <p><b>Posted timeline:</b></p>
                <label>
                  <input
                    type="radio"
                    name="postedTime"
                    value="Newest"
                    onChange={updateFilterValue}
                    checked={filters.postedTime === "Newest"}
                  />
                  Newest First
                </label>
                <label>
                  <input
                    type="radio"
                    name="postedTime"
                    value="Oldest"
                    onChange={updateFilterValue}
                    checked={filters.postedTime === "Oldest"}
                  />
                  Oldest First
                </label>
              </div>
              <hr />
              <div className="cate-duration">
                <p><b>Job Duration:</b></p>
                <select
                  name="duration"
                  id="cate-post-time"
                  onChange={updateFilterValue}
                  value={filters.duration}
                >
                  <option value="All Durations">All Durations</option>
                  <option value="hourly">Hourly</option>
                  <option value="Less than a week">Less than a week</option>
                  <option value="1 to 4 weeks">1 to 4 weeks</option>
                  <option value="1 to 3 months">1 to 3 months</option>
                  <option value="3 to 6 months">3 to 6 months</option>
                  <option value="Over 6 months">Over 6 months</option>
                </select>
              </div>
              <button
                type="button"
                className="cbutton"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </form>
          </div>

          <div className="jobs">
            <ul className="inside-jobs">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <li key={job._id} className="job-card">
                    <div className="images-jobs">
                      <img src="https://via.placeholder.com/150" alt={job.title} />
                    </div>
                    <div className="cate-body">
                      <p className="cate-title">{job.title}</p>
                      <p className="cate-foot">
                        <b>Date Posted:</b> {job.dateJoined}
                      </p>
                      <p className="cate-description">
                         {job.description}
                      </p>
                      <button 
                        className="see-more-btn" 
                        onClick={() => handleSeeMoreClick(job)}
                      >
                        {selectedJob && selectedJob._id === job._id ? 'See Less' : 'See More'}
                      </button>

                      {/* Show more details if the job is selected */}
                      {selectedJob && selectedJob._id === job._id && (
                        <div className="job-details">
                          <p><b>Job Type:</b> {job.jobType}</p>
                          <p><b>Location:</b> {job.location}</p>
                          <p><b>Skills Required:</b> {job.skillsRequired}</p>
                          <p><b>Application Deadline:</b> {job.applicationDeadline}</p>
                          <p><b>Experience Level:</b> {job.experienceLevel}</p>
                          <a href={`http://localhost:5000/${job.workFile}`} download className="download-link">
  Download Job Details
</a>


                          <button className="apply-btn" onClick={() => alert('Applied!')}>Apply</button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p>No jobs found based on the filters</p>
              )}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Filter;
