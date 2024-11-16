
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css'


const NavbarManger = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-menu">
                    {/*<Link to="/closeticket" className="nav-item">*/}
                    {/*    Add Solutions*/}
                    {/*</Link>*/}

                    <Link to="/generatereports" className="nav-item">
                        Generate Reports
                    </Link>

                    <Link to="/viewreports" className="nav-item">
                        View Reports
                    </Link>

                   <Link to="/Analytics" className="nav-item">
                        Analytics
                   </Link>

                    <Link to="/logout" className="nav-item">
                        Logout
                    </Link>


                </div>
            </div>
        </nav>
    );
};

export default NavbarManger;
