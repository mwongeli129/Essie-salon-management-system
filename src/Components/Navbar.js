import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Css/Styling.css';
import logo from "../Images/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <div id="logo-container">
                    <img id="logo" src={logo} alt="salon logo" />
                    <div id="luxe-container">
                        <h2 id="luxe">LUXE SALON</h2>
                    </div>
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={isMenuOpen ? "bar1 change" : "bar1"}></div>
                    <div className={isMenuOpen ? "bar2 change" : "bar2"}></div>
                    <div className={isMenuOpen ? "bar3 change" : "bar3"}></div>
                </div>
                <ul className={isMenuOpen ? "nav-links show" : "nav-links"}>
                    <li><Link to="/Index"><span>HOME</span></Link></li>
                    <li><Link to="/About"><span>ABOUT</span></Link></li>
                    <li><Link to="/Stylists"><span>STYLISTS</span></Link></li>
                    <li><Link to="/Contact"><span>CONTACTS</span></Link></li>
                    <li><Link to="/Review"><span>REVIEWS</span></Link></li>
                    <li><Link to="/Login"><span>LOGIN</span></Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
