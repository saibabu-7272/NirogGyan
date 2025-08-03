import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>NirogGyan</h3>
          <p>Your trusted healthcare appointment booking platform. Find the right doctor and book appointments with ease.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/my-appointments">My Appointments</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><span>📞</span> 6302326140</p>
          <p><span>✉️</span> saibabu61242@gmail.com</p>
          <p><span>🏢</span> 123 Health Avenue, Medical District</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NirogGyan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
