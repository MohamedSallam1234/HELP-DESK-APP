// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'


const NavbarAdmin = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-menu">
                    <Link to="/createUsers" className="nav-item">
                        <button className="btn btn-primary">Create Users</button>
                    </Link>

                    <Link to="/adminChangeRole" className="nav-item">
                        <button className="btn btn-primary">Change Role</button>
                    </Link>

                    <Link to="/logout" className="nav-item">
                        <button className="btn btn-primary">Log Out</button>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default NavbarAdmin;
