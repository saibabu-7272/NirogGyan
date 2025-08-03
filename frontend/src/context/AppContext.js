import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample data for development
  const sampleDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      profileImage: 'doctor1.jpg',
      bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
      isAvailable: true,
      availableSlots: [
        { id: 'slot1', day: 'Monday', startTime: '10:00 AM', endTime: '10:30 AM' },
        { id: 'slot2', day: 'Monday', startTime: '11:00 AM', endTime: '11:30 AM' },
        { id: 'slot3', day: 'Tuesday', startTime: '2:00 PM', endTime: '2:30 PM' },
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      profileImage: 'doctor2.jpg',
      bio: 'Dr. Michael Chen is a dermatologist specializing in both medical and cosmetic dermatology. He has expertise in treating skin conditions such as acne, eczema, and psoriasis.',
      isAvailable: true,
      availableSlots: [
        { id: 'slot4', day: 'Wednesday', startTime: '9:00 AM', endTime: '9:30 AM' },
        { id: 'slot5', day: 'Thursday', startTime: '1:00 PM', endTime: '1:30 PM' },
      ]
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrician',
      profileImage: 'doctor3.jpg',
      bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She believes in a holistic approach to child health.',
      isAvailable: false,
      availableSlots: []
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedic Surgeon',
      profileImage: 'doctor4.jpg',
      bio: 'Dr. James Wilson is an orthopedic surgeon with a focus on sports medicine and joint replacement. He has worked with several professional sports teams throughout his career.',
      isAvailable: true,
      availableSlots: [
        { id: 'slot6', day: 'Monday', startTime: '3:00 PM', endTime: '3:30 PM' },
        { id: 'slot7', day: 'Friday', startTime: '10:00 AM', endTime: '10:30 AM' },
      ]
    },
    {
      id: '5',
      name: 'Dr. Priya Patel',
      specialization: 'Neurologist',
      profileImage: 'doctor5.jpg',
      bio: 'Dr. Priya Patel is a neurologist with expertise in headache medicine, stroke treatment, and neurodegenerative disorders. She combines traditional approaches with the latest research.',
      isAvailable: true,
      availableSlots: [
        { id: 'slot8', day: 'Tuesday', startTime: '11:00 AM', endTime: '11:30 AM' },
        { id: 'slot9', day: 'Thursday', startTime: '4:00 PM', endTime: '4:30 PM' },
      ]
    }
  ];

  // Fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulated API call
      setTimeout(() => {
        setDoctors(sampleDoctors);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors. Please try again later.');
      setLoading(false);
    }
  };

  // Search doctors by name or specialization
  const searchDoctors = (query) => {
    setSearchTerm(query);

    if (!query) {
      setFilteredDoctors([]);
      return;
    }

    setLoading(true);

    // Simulate search request
    setTimeout(() => {
      const filteredDoctors = sampleDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredDoctors(filteredDoctors);
      setLoading(false);
    }, 500);
  };

  // Get doctor by ID
  const getDoctorById = (id) => {
    return sampleDoctors.find(doctor => doctor.id === id) || null;
  };

  // Book appointment
  const bookAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // Simulate booking process
      return new Promise((resolve) => {
        setTimeout(() => {
          // Save user email to localStorage
          if (appointmentData.patientEmail) {
            localStorage.setItem('userEmail', appointmentData.patientEmail);
            setUserEmail(appointmentData.patientEmail);
          }

          setLoading(false);
          resolve({ success: true, message: 'Appointment booked successfully!' });
        }, 1500);
      });
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
      setLoading(false);
      return { success: false, message: 'Failed to book appointment.' };
    }
  };

  // Get user appointments (mock data for now)
  const getUserAppointments = () => {
    if (!userEmail) return [];

    // Mock appointments data
    return [
      {
        id: 'appt-1',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialization: 'Cardiologist',
        appointmentDate: '2025-08-15',
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled'
      },
      {
        id: 'appt-2',
        doctorName: 'Dr. Priya Patel',
        doctorSpecialization: 'Dermatologist',
        appointmentDate: '2025-08-20',
        startTime: '11:00',
        endTime: '12:00',
        status: 'scheduled'
      }
    ];
  };

  // Load doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Context value
  const value = {
    doctors,
    filteredDoctors,
    searchTerm,
    searchDoctors,
    getDoctorById,
    appointments,
    getUserAppointments,
    bookAppointment,
    userEmail,
    loading,
    error,
    fetchDoctors
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

