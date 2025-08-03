import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { userEmail, clearUserData } = useAppContext();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-nirog">Nirog</span>
          <span className="logo-gyan">Gyan</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {userEmail ? (
            <>
              <Link to="/my-appointments" className="nav-link">My Appointments</Link>
              
            </>
          ) : null}
          
          <a href="tel:+1800-123-4567" className="nav-link contact-link">
            <span className="phone-icon">📞</span> 6302326140
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
