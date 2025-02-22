import React from 'react';
import './Help.css'; // Import the CSS file for styling

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-box">
        <h2>Help & Support</h2>
        <p>If you have any questions or need assistance, please refer to the following resources:</p>
        <ul>
          <li><a href="#" target="_blank" rel="noopener noreferrer">FAQ</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Support Center</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
        </ul>
        <p>For immediate assistance, you can reach our support team at:</p>
        <p><strong>Email:</strong> support@your-website.com</p>
        <p><strong>Phone:</strong> +1 (800) 123-4567</p>
      </div>
    </div>
  );
};

export default Help;