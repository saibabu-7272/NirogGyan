import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Home.css';

// Components
import DoctorCard from '../../components/DoctorCard/DoctorCard';

const Home = () => {
  const { doctors, filteredDoctors, loading, error, searchTerm, fetchDoctors, searchDoctors } = useAppContext();
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    searchDoctors(searchInput);
  };
  
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find the Right Doctor & Book Appointment</h1>
        <p>Your health is our priority. Book appointments with top doctors in just a few clicks.</p>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by doctor name or specialization"
            value={searchInput}
            onChange={handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
      
      <div className="doctors-section">
        <h2>Our Doctors</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchDoctors} className="btn btn-primary">Try Again</button>
          </div>
        ) : (
          <>
            {searchTerm && (
              <div className="search-results-info">
                <p>
                  {filteredDoctors.length === 0 
                    ? `No results found for "${searchTerm}"` 
                    : `Showing ${filteredDoctors.length} result(s) for "${searchTerm}"`}
                </p>
                <button onClick={() => {searchDoctors(''); fetchDoctors();}} className="clear-search-btn">
                  Clear Search
                </button>
              </div>
            )}
            
            {doctors.length === 0 && !searchTerm ? (
              <p className="no-doctors-message">No doctors available at the moment.</p>
            ) : (
              <div className="doctors-grid">
                {(searchTerm ? filteredDoctors : doctors).map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="specializations-section">
        <h2>Medical Specializations</h2>
        <div className="specialization-cards">
          <div className="specialization-card">
            <div className="specialization-icon">❤️</div>
            <h3>Cardiology</h3>
            <p>Heart care specialists</p>
          </div>
          <div className="specialization-card">
            <div className="specialization-icon">🦴</div>
            <h3>Orthopedics</h3>
            <p>Bone and joint care</p>
          </div>
          <div className="specialization-card">
            <div className="specialization-icon">👶</div>
            <h3>Pediatrics</h3>
            <p>Child healthcare</p>
          </div>
          <div className="specialization-card">
            <div className="specialization-icon">🧠</div>
            <h3>Neurology</h3>
            <p>Brain and nerve specialists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
