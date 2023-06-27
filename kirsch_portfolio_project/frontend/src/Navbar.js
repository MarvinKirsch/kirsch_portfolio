import React from 'react';

const Navbar = () => (
    <nav className="navbar navbar-dark">
        <a className="navbar-brand" href="#">My Portfolio</a>
        <ul className="navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Projects</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">About Me</a>
            </li>
        </ul>
    </nav>
);

export default Navbar;
