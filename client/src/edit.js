import React, { useState } from 'react';
import './prof2.css'; 

function DetailsBlocks() {
    const [formData, setFormData] = useState({
        name: "P Santosh Babu",
        pic: "santosh.jpg",
        designation: "Student",
        number: "+91 9666566793",
        mail: "santoshpsbd1@gmail.com",
        education: [
            { educationName: "BE", collegeName: "CBIT", year: "2022-26", marks: "9.67" },
            { educationName: "INTERMEDIATE", collegeName: "Ascent Classes", year: "2020-22", marks: "957" }
        ],
        skills: [
            { skillName: "C", platformName: "NPTEL", year: "2022", marks: "75" },
            { skillName: "Python", platformName: "-", year: "-", marks: "-" }
        ],
        languages: [
            { languageName: "English", fluency: "Fluent" },
            { languageName: "Telugu", fluency: "Fluent" }
        ]
    });

    const [visibleAlert, setVisibleAlert] = useState(null);

    const handleInputChange = (event, sectionIndex, field, section) => {
        const value = event.target.value;
        if (section) {
            const updatedSection = [...formData[section]];
            updatedSection[sectionIndex][field] = value;
            setFormData({ ...formData, [section]: updatedSection });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleAlertButtonClick = (id) => {
        setVisibleAlert(id);
    };

    const handleCloseAlert = () => {
        setVisibleAlert(null);
    };

    const AlertForm = ({ id }) => {
        const formContent = {
            educat: [
                { label: "Education Name", id: "educationName" },
                { label: "College Name", id: "collegeName" },
                { label: "Year", id: "year" },
                { label: "Marks", id: "marks" }
            ],
            ski: [
                { label: "Skill Name", id: "skillName" },
                { label: "Platform Name", id: "platformName" },
                { label: "Year", id: "year" },
                { label: "Marks", id: "marks" }
            ],
            langu: [
                { label: "Language Name", id: "languageName" },
                { label: "Fluency", id: "fluency" }
            ]
        };

        return (
            <div className={`alert-box ${visibleAlert === id ? 'visible' : ''}`}>
                <div className="alert-div">
                    <span className="close-btn" onClick={handleCloseAlert}>X</span>
                    <h2>{id === 'educat' ? 'New Education Qualification' : id === 'ski' ? 'New Skills' : 'New Language Details'}</h2>
                    {formContent[id].map(({ label, id }) => (
                        <div className="alert-inp" key={id}>
                            <label htmlFor={id}>{label}</label><br />
                            <input type="text" id={id} name={id} /><br />
                        </div>
                    ))}
                    <button className="alert-sub" onClick={handleCloseAlert}>Add Details</button>
                </div>
            </div>
        );
    };

    return (
        <div  className='edit_block'>
            <form className="Infor_block" onSubmit={handleFormSubmit}>
                {/* Personal Information Block */}
                <div className="sub_block">
                    <h2>Personal Information</h2>
                    {["name", "pic", "designation", "number", "mail"].map((field) => (
                        <React.Fragment key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === 'mail' ? 'email' : 'text'}
                                value={formData[field]}
                                className='old_input'
                                onChange={(e) => handleInputChange(e, null, field)}
                            /><br />
                        </React.Fragment>
                    ))}
                </div>

                {/* Education Block */}
                <div className="sub_block">
                    <div className="adder">
                        <h2>Education</h2>
                        <button type="button" className="alert-btn" onClick={() => handleAlertButtonClick('educat')}>Add+</button>
                    </div>
                    {formData.education.map((edu, index) => (
                        <div key={index}>
                            {["educationName", "collegeName", "year", "marks"].map((field) => (
                                <React.Fragment key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
                                    <input
                                        type="text"
                                        value={edu[field]}
                                        className='old_input'
                                        onChange={(e) => handleInputChange(e, index, field, 'education')}
                                    /><br />
                                </React.Fragment>
                            ))}
                            <hr />
                        </div>
                    ))}
                </div>

                {/* Skills Block */}
                <div className="sub_block">
                    <div className="adder">
                        <h2>Skills</h2>
                        <button type="button" className="alert-btn" onClick={() => handleAlertButtonClick('ski')}>Add+</button>
                    </div>
                    {formData.skills.map((skill, index) => (
                        <div key={index}>
                            {["skillName", "platformName", "year", "marks"].map((field) => (
                                <React.Fragment key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
                                    <input
                                        type="text"
                                        value={skill[field]}
                                        className='old_input'
                                        onChange={(e) => handleInputChange(e, index, field, 'skills')}
                                    /><br />
                                </React.Fragment>
                            ))}
                            <hr />
                        </div>
                    ))}
                </div>

                {/* Language Block */}
                <div className="sub_block">
                    <div className="adder">
                        <h2>Languages</h2>
                        <button type="button" className="alert-btn" onClick={() => handleAlertButtonClick('langu')}>Add+</button>
                    </div>
                    {formData.languages.map((lang, index) => (
                        <div key={index}>
                            {["languageName", "fluency"].map((field) => (
                                <React.Fragment key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
                                    <input
                                        type="text"
                                        value={lang[field]}
                                        className='old_input'
                                        onChange={(e) => handleInputChange(e, index, field, 'languages')}
                                    /><br />
                                </React.Fragment>
                            ))}
                            <hr />
                        </div>
                    ))}
                </div>

                <button type="submit" className="last_submit">Submit</button>
            </form>

            {/* Alerts */}
            {['educat', 'ski', 'langu'].map((id) => (
                <AlertForm key={id} id={id} />
            ))}
        </div>
    );
}

export default DetailsBlocks;
