import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi'; // Small filter icon
import styled from 'styled-components';

const mockFreelancers = [
  { id: 1, name: "Alice Johnson", username: "alicejohn", stars: 4.5, points: 120, experience: "5 years",number:7 },
  { id: 2, name: "Bob Smith", username: "bobsmith", stars: 4.0, points: 100, experience: "3 years" ,number:7},
  { id: 3, name: "Charlie Brown", username: "charlieb", stars: 4.7, points: 150, experience: "6 years" ,number:7},
  { id: 4, name: "Diana Prince", username: "dianap", stars: 4.2, points: 110, experience: "4 years" ,number:7},
  { id: 5, name: "Edward Elric", username: "edwarde", stars: 4.8, points: 200, experience: "7 years" ,number:7},
  { id: 6, name: "Fiona Gallagher", username: "fionag", stars: 4.1, points: 90, experience: "3 years" ,number:7},
  { id: 7, name: "George Michael", username: "georgem", stars: 4.3, points: 130, experience: "5 years",number:7 },
  { id: 8, name: "Hannah Montana", username: "hannahm", stars: 4.6, points: 140, experience: "6 years" ,number:7},
  { id: 9, name: "Isaac Newton", username: "isaacn", stars: 4.4, points: 115, experience: "4 years" ,number:4},
  { id: 10, name: "Jasmine Reed", username: "jasminer", stars: 4.9, points: 180, experience: "7 years" ,number:7},
  { id: 11, name: "Kevin Hart", username: "kevinh", stars: 4.2, points: 105, experience: "5 years" ,number:7},
  { id: 12, name: "Luna Lovegood", username: "lunal", stars: 4.5, points: 125, experience: "5 years" ,number:7},
  { id: 13, name: "Michael Scott", username: "michaels", stars: 4.0, points: 85, experience: "3 years" ,number:7},
  { id: 14, name: "Natalie Portman", username: "nataliep", stars: 4.7, points: 160, experience: "6 years",number:7 },
  { id: 15, name: "Oscar Wilde", username: "oscarw", stars: 4.3, points: 140, experience: "5 years" ,number:7},
  { id: 16, name: "Piper Halliwell", username: "piperh", stars: 4.6, points: 150, experience: "6 years",number:7 },
  { id: 17, name: "Quincy Adams", username: "quincya", stars: 4.1, points: 95, experience: "4 years" ,number:7},
  { id: 18, name: "Rachel Green", username: "rachelg", stars: 4.8, points: 170, experience: "7 years" ,number:7},
  { id: 19, name: "Sam Winchester", username: "samw", stars: 4.4, points: 125, experience: "5 years" ,number:7},
  { id: 20, name: "Tina Fey", username: "tinaf", stars: 4.9, points: 190, experience: "8 years" ,number:7},
  { id: 21, name: "Ursula K. Le Guin", username: "ursulak", stars: 4.3, points: 135, experience: "6 years" ,number:7},
  { id: 22, name: "Victor Hugo", username: "victorh", stars: 4.2, points: 110, experience: "5 years",number:7 },
  { id: 23, name: "Will Smith", username: "wills", stars: 4.5, points: 145, experience: "7 years" ,number:7},
  { id: 24, name: "Xena Warrior", username: "xenaw", stars: 4.0, points: 80, experience: "4 years" ,number:7},
  { id: 25, name: "Yara Shahidi", username: "yaras", stars: 4.6, points: 160, experience: "6 years" ,number:7},
  { id: 26, name: "Zane Grey", username: "zaneg", stars: 4.7, points: 175, experience: "7 years" ,number:7},
];


const FreelancerLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState({ column: 'name', direction: 'asc' });
  const [filteredFreelancers, setFilteredFreelancers] = useState(mockFreelancers);
  const [filterMenu, setFilterMenu] = useState(null);
  const [filterValues, setFilterValues] = useState({ minStars: '', maxStars: '', minPoints: '', maxPoints: '', minExperience: '', maxExperience: '' });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    applyFilters(); // Apply filters when search query changes
  };
  

  const handleSort = (column) => {
    const direction = sortOption.column === column && sortOption.direction === 'asc' ? 'desc' : 'asc';
    setSortOption({ column, direction });
  };

  const handleFilterClick = (column) => {
    setFilterMenu(column);
  };

  const handleFilterChange = (event) => {
    setFilterValues({ ...filterValues, [event.target.name]: event.target.value });
  };

  const applyFilters = () => {
    let filtered = mockFreelancers;
  
    if (searchQuery) {
      filtered = filtered.filter(freelancer =>
        freelancer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    if (filterMenu === 'stars') {
      const { minStars, maxStars } = filterValues;
      filtered = filtered.filter(freelancer =>
        (minStars === '' || freelancer.stars >= parseFloat(minStars)) &&
        (maxStars === '' || freelancer.stars <= parseFloat(maxStars))
      );
    } else if (filterMenu === 'points') {
      const { minPoints, maxPoints } = filterValues;
      filtered = filtered.filter(freelancer =>
        (minPoints === '' || freelancer.points >= parseFloat(minPoints)) &&
        (maxPoints === '' || freelancer.points <= parseFloat(maxPoints))
      );
    } else if (filterMenu === 'experience') {
      const { minExperience, maxExperience } = filterValues;
      const convertExperience = (exp) => parseInt(exp.split(' ')[0], 10);
      filtered = filtered.filter(freelancer =>
        (minExperience === '' || convertExperience(freelancer.experience) >= parseInt(minExperience, 10)) &&
        (maxExperience === '' || convertExperience(freelancer.experience) <= parseInt(maxExperience, 10))
      );
    }
  
    setFilteredFreelancers(filtered);
    setFilterMenu(null); // Close filter menu after applying
  };
  

  const getSortedFreelancers = () => {
    let sorted = filteredFreelancers.slice();

    if (sortOption.column === 'name') {
      sorted.sort((a, b) => sortOption.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name));
    } else if (sortOption.column === 'stars') {
      sorted.sort((a, b) => sortOption.direction === 'asc' ? a.stars - b.stars : b.stars - a.stars);
    } else if (sortOption.column === 'points') {
      sorted.sort((a, b) => sortOption.direction === 'asc' ? a.points - b.points : b.points - a.points);
    } else if (sortOption.column === 'experience') {
      const convertExperience = (exp) => parseInt(exp.split(' ')[0], 10);
      sorted.sort((a, b) => sortOption.direction === 'asc'
        ? convertExperience(a.experience) - convertExperience(b.experience)
        : convertExperience(b.experience) - convertExperience(a.experience));
    }

    return sorted;
  };

  const sortedFreelancers = getSortedFreelancers();

  return (
    <Wrapper>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={applyFilters}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortOption.column === 'name' && (sortOption.direction === 'asc' ? '🔼' : '🔽')}</th>
            <th onClick={() => handleSort('stars')}>
              Stars
              <FilterIcon onClick={() => handleFilterClick('stars')} />
            </th>
            <th onClick={() => handleSort('points')}>
              Points
              <FilterIcon onClick={() => handleFilterClick('points')} />
            </th>
            <th onClick={() => handleSort('experience')}>
              Experience
              <FilterIcon onClick={() => handleFilterClick('experience')} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFreelancers.map(freelancer => (
            <tr key={freelancer.id}>
              <td>{freelancer.name}</td>
              <td><ProStars stars={freelancer.stars} /></td>
              <td>{freelancer.points}</td>
              <td>{freelancer.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filterMenu && (
        <FilterMenu>
          {filterMenu === 'stars' && (
            <>
              <label>Min Stars:</label>
              <input
                type="text"
                name="minStars"
                value={filterValues.minStars}
                onChange={handleFilterChange}
                placeholder="Min Stars"
              />
              <label>Max Stars:</label>
              <input
                type="text"
                name="maxStars"
                value={filterValues.maxStars}
                onChange={handleFilterChange}
                placeholder="Max Stars"
              />
            </>
          )}
          {filterMenu === 'points' && (
            <>
              <label>Min Points:</label>
              <input
                type="text"
                name="minPoints"
                value={filterValues.minPoints}
                onChange={handleFilterChange}
                placeholder="Min Points"
              />
              <label>Max Points:</label>
              <input
                type="text"
                name="maxPoints"
                value={filterValues.maxPoints}
                onChange={handleFilterChange}
                placeholder="Max Points"
              />
            </>
          )}
          {filterMenu === 'experience' && (
            <>
              <label>Min Experience:</label>
              <input
                type="text"
                name="minExperience"
                value={filterValues.minExperience}
                onChange={handleFilterChange}
                placeholder="Min Experience (years)"
              />
              <label>Max Experience:</label>
              <input
                type="text"
                name="maxExperience"
                value={filterValues.maxExperience}
                onChange={handleFilterChange}
                placeholder="Max Experience (years)"
              />
            </>
          )}
          <button onClick={applyFilters}>Apply</button>
        </FilterMenu>
      )}
    </Wrapper>
  );
};

const ProStars = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return <div className="icon-style">{ratingStar}</div>;
};


const Wrapper = styled.div`
  padding: 2rem;
  background-color: white;
  
  .icon-style {
    display: flex; /* Flexbox to align stars horizontally */
    gap: 2px; /* Small gap between stars */
  }

  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-container input[type="text"] {
    width: 300px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin-right: 10px;
  }

  .search-container button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .search-container button:hover {
    background-color: #0056b3;
  }

  .table-container {
    max-height: 500px; /* Adjust based on your design */
    overflow-y: auto; /* Enable scrolling if needed */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      tr {
        th {
          padding: 0.75rem;
          text-align: left;
          cursor: pointer;
          background-color: #f5f5f5;
          &:hover {
            background-color: #e0e0e0;
          }
        }
      }
    }
    tbody {
      tr {
        &:hover {
          background-color: #f9f9f9;
        }
        td {
          padding: 0.75rem;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
`;



const FilterIcon = styled(FiFilter)`
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 2.5rem; /* Adjust based on your header height */
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  max-height: 300px; /* Adjust based on your design */
  overflow-y: auto; /* Allow vertical scrolling if content overflows */

  label {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  button {
    padding: 0.5rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    align-self: flex-end;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;


export default FreelancerLeaderboard;
