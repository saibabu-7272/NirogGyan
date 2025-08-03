import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './BookAppointment.css';

const BookAppointment = () => {
  const { doctorId, slotId } = useParams();
  const navigate = useNavigate();
  const { getDoctorById, bookAppointment, loading } = useAppContext();
  
  // Form state
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    phone: ''
  });
  
  // UI state
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  useEffect(() => {
    // Get doctor data
    const doctorData = getDoctorById(doctorId);
    
    if (doctorData) {
      setDoctor(doctorData);
      
      // Find the selected slot
      const slot = doctorData.availableSlots.find(s => s.id === slotId);
      
      if (slot) {
        setSelectedSlot(slot);
      } else {
        setError('The selected appointment slot was not found');
      }
    } else {
      setError('Doctor not found');
    }
  }, [doctorId, slotId, getDoctorById]);
  
  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.patientName.trim()) {
      errors.patientName = 'Name is required';
    }
    
    if (!formData.patientEmail.trim()) {
      errors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      errors.patientEmail = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // In a real app, this would send data to the server
      const appointmentData = {
        doctorId,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        phone: formData.phone,
        appointmentDate: new Date().toISOString().split('T')[0], // Today's date as placeholder
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      };
      
      const result = await bookAppointment(appointmentData);
      
      if (result.success) {
        setBookingSuccess(true);
      } else {
        setError(result.message || 'Failed to book appointment');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Processing your appointment request...</p>
      </div>
    );
  }
  
  if (bookingSuccess) {
    return (
      <div className="booking-success">
        <div className="success-icon">✅</div>
        <h2>Appointment Booked Successfully!</h2>
        <p>Thank you for booking an appointment with {doctor?.name}.</p>
        <p>A confirmation email has been sent to {formData.patientEmail}.</p>
        <div className="action-buttons">
          <Link to="/my-appointments" className="btn btn-primary">View My Appointments</Link>
          <Link to="/" className="btn btn-secondary">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  if (error || !doctor || !selectedSlot) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Something went wrong'}</p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }
  
  return (
    <div className="book-appointment-page">
      <div className="appointment-header">
        <h1>Book an Appointment</h1>
        <div className="appointment-details">
          <div className="doctor-info">
            <img src={`/assets/${doctor.profileImage}`} alt={doctor.name} className="doctor-thumbnail" />
            <div>
              <h2>{doctor.name}</h2>
              <p>{doctor.specialization}</p>
            </div>
          </div>
          
          <div className="slot-info">
            <p><strong>Day:</strong> {selectedSlot.day}</p>
            <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
          </div>
        </div>
      </div>
      
      <div className="appointment-form-container">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="patientName">Full Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={formErrors.patientName ? 'form-control error' : 'form-control'}
            />
            {formErrors.patientName && <p className="error-message">{formErrors.patientName}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="patientEmail">Email Address</label>
            <input
              type="email"
              id="patientEmail"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              className={formErrors.patientEmail ? 'form-control error' : 'form-control'}
            />
            {formErrors.patientEmail && <p className="error-message">{formErrors.patientEmail}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={formErrors.phone ? 'form-control error' : 'form-control'}
            />
            {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
