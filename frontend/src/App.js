import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import MyAppointments from './pages/MyAppointments/MyAppointments';

// Context Provider
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/book-appointment/:doctorId/:slotId" element={<BookAppointment />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
