import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const { getDoctorById, loading } = useAppContext();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Get doctor data from context
    const doctorData = getDoctorById(id);
    
    if (doctorData) {
      setDoctor(doctorData);
    } else {
      setError('Doctor not found');
    }
  }, [id, getDoctorById]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctor information...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Doctor not found'}</p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="profile-image">
          <img src={`/assets/${doctor.profileImage}`} alt={doctor.name} />
        </div>
        
        <div className="profile-info">
          <h1>{doctor.name}</h1>
          <p className="specialization">{doctor.specialization}</p>
          <div className={`availability-badge ${doctor.isAvailable ? 'available' : 'unavailable'}`}>
            {doctor.isAvailable ? 'Available' : 'Not Available'}
          </div>
        </div>
      </div>

      <div className="profile-section bio-section">
        <h2>About Doctor</h2>
        <p>{doctor.bio}</p>
      </div>

      {doctor.isAvailable && doctor.availableSlots && doctor.availableSlots.length > 0 && (
        <div className="profile-section appointments-section">
          <h2>Available Appointment Slots</h2>
          <div className="slots-grid">
            {doctor.availableSlots.map((slot) => (
              <div key={slot.id} className="appointment-slot">
                <div className="slot-info">
                  <div className="slot-day">{slot.day}</div>
                  <div className="slot-time">{slot.startTime} - {slot.endTime}</div>
                </div>
                <Link 
                  to={`/book-appointment/${doctor.id}/${slot.id}`}
                  className="book-slot-btn"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(!doctor.isAvailable || !doctor.availableSlots || doctor.availableSlots.length === 0) && (
        <div className="no-slots-message">
          <p>No appointment slots available at the moment.</p>
        </div>
      )}
      
      <div className="back-link">
        <Link to="/" className="btn-back">
          &larr; Back to Doctors
        </Link>
      </div>
    </div>
  );
};

export default DoctorProfile;
