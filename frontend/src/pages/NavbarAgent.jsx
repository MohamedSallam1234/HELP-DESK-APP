// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'


const NavbarAgent = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-menu">
                    {/*<Link to="/closeticket" className="nav-item">*/}
                    {/*    Add Solutions*/}
                    {/*</Link>*/}

                    <Link to="/AgentTickets" className="nav-item">
                        Tickets
                    </Link>

                    <Link to="/chatHome" className="nav-item">
                        Chat
                    </Link>

                   <Link to="/email" className="nav-item">
                        Email
                   </Link>

                    <Link to="/logout" className="nav-item">
                        Logout
                    </Link>


                </div>
            </div>
        </nav>
    );
};

export default NavbarAgent;
