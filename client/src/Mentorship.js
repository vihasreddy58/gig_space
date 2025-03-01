import React, { useState, useEffect } from 'react';
import './MentorshipPage.css'; // Import CSS for styling

const MentorshipPage = () => {
    const [mentors, setMentors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch mentors data (from API or hardcoded for now)
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        // Replace this with actual API call
        const mentorData = [
            { name: 'John Doe', expertise: 'Web Development', rating: 4.9 },
            { name: 'Jane Smith', expertise: 'Graphic Design', rating: 4.7 },
            { name: 'Rahul Sharma', expertise: 'Digital Marketing', rating: 4.8 },
        ];
        setMentors(mentorData);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="mentorship-page">
            <h1>Find a Mentor</h1>
            <input
                type="text"
                placeholder="Search by expertise..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-box"
            />
            <div className="mentors-list">
                {mentors
                    .filter(mentor =>
                        mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((mentor, index) => (
                        <div key={index} className="mentor-card">
                            <h2>{mentor.name}</h2>
                            <p>Expertise: {mentor.expertise}</p>
                            <p>Rating: {mentor.rating} ⭐</p>
                            <button className="message-btn">Message</button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MentorshipPage;
