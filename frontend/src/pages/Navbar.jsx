// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">


        <div className="nav-menu">
          <Link to="/create-ticket" className="nav-item">
            Send Ticket
          </Link>

          <Link to="/view-tickets" className="nav-item">
            View Tickets
          </Link>

          <Link to="/user-profile" className="nav-item">
            User Profile
          </Link>

          <Link to="/knowledgebase" className="nav-item">
          Knowledge Base
          </Link>

          <Link to="/Logout" className="nav-item">
           Logout
          </Link>




        </div>
      </div>
    </nav>
  );
};

export default Navbar;
