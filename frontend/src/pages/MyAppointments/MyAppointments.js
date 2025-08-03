import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './MyAppointments.css';

const MyAppointments = () => {
  const { getUserAppointments, userEmail, loading } = useAppContext();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get appointments from context (in a real app, this would be an API call)
        const userAppointments = getUserAppointments();
        setAppointments(userAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load your appointments. Please try again later.');
      }
    };

    fetchAppointments();
  }, [getUserAppointments]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your appointments...</p>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="not-logged-in">
        <h2>Please Enter Your Email</h2>
        <p>To view your appointments, please enter your email address below.</p>
        
        <div className="email-form">
          <input 
            type="email" 
            placeholder="Your email address"
            className="email-input"
            // In a real app, we would implement state and handlers here
          />
          <button className="btn btn-primary">Find My Appointments</button>
        </div>
        
        <div className="go-back">
          <Link to="/" className="back-link">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-appointments-page">
      <h1>My Appointments</h1>
      
      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      ) : (
        <>
          {appointments.length === 0 ? (
            <div className="no-appointments">
              <p>You don't have any appointments scheduled.</p>
              <Link to="/" className="btn btn-primary">Book an Appointment</Link>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-doctor">
                      <h3>{appointment.doctorName}</h3>
                      <p>{appointment.doctorSpecialization}</p>
                    </div>
                    <div className={`appointment-status ${appointment.status}`}>
                      {appointment.status}
                    </div>
                  </div>
                  
                  <div className="appointment-details">
                    <div className="appointment-date">
                      <div className="detail-label">Date</div>
                      <div className="detail-value">{formatDate(appointment.appointmentDate)}</div>
                    </div>
                    
                    <div className="appointment-time">
                      <div className="detail-label">Time</div>
                      <div className="detail-value">{appointment.startTime} - {appointment.endTime}</div>
                    </div>
                  </div>
                  
                  <div className="appointment-actions">
                    <button className="btn btn-secondary">Reschedule</button>
                    <button className="btn btn-cancel">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="page-actions">
            <Link to="/" className="btn btn-primary">Book New Appointment</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointments;
