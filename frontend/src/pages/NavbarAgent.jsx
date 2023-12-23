// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'


const NavbarAgent = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">


        <div className="nav-menu">
          <Link to="/closeticket" className="nav-item">
            Add Solutions
          </Link>

          <Link to="/addautomatedsolution" className="nav-item">
            Tickets
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default NavbarAgent;
