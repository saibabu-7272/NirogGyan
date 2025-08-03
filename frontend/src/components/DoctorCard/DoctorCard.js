import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const { id, name, specialization, profileImage, isAvailable } = doctor;
  
  return (
    <div className="doctor-card">
      <div className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
        {isAvailable ? 'Available' : 'Not Available'}
      </div>
      
      <div className="doctor-image">
        <img src={`/assets/${profileImage}`} alt={`Dr. ${name}`} />
      </div>
      
      <div className="doctor-info">
        <h3 className="doctor-name">{name}</h3>
        <div className="specialization-action">
          <p className="doctor-specialization">{specialization}</p>
          <Link to={`/doctor/${id}`} className="view-profile-btn">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
