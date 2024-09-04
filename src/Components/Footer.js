import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUserPlus, faSignInAlt, faCalendarCheck, faUsers, faConciergeBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="dylan">
          <h1>Luxe Salon</h1>
          <h1 className="Stay-connected">Stay Connected <br />Follow Us for Exclusive Offers and Updates!</h1>
        </div>
        <div className="Copyright">
          <p className="Copyright">© {new Date().getFullYear()} - All Rights Reserved. Designed by Pretty Essie 🥰</p>
        </div>
        <div className="follow">
          <h1>Follow us</h1>
          <div className="follow-h3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <h3><FontAwesomeIcon className="f-icons"icon={faFacebookF} /> Facebook</h3>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <h3><FontAwesomeIcon className="f-icons" icon={faLinkedinIn} /> LinkedIn</h3>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <h3><FontAwesomeIcon className="f-icons"  icon={faTwitter} /> Twitter</h3>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <h3><FontAwesomeIcon className="f-icons" icon={faInstagram} /> Instagram</h3>
            </a>
          </div>
        </div>
        <div className="links">
          <h1>Quick Links</h1>
          <div className="links-div">
            <a href="/Signup"><h3><FontAwesomeIcon className="f-icons"  icon={faUserPlus} /> Get Started</h3></a>
            <a href="/Login"><h3><FontAwesomeIcon className="f-icons"  icon={faSignInAlt} /> Login</h3></a>
            <a href="/Booking"><h3><FontAwesomeIcon className="f-icons" icon={faCalendarCheck} /> Book Now</h3></a>
            <a href="/Stylists"><h3><FontAwesomeIcon className="f-icons" icon={faUsers} /> Our Team</h3></a>
            <a href="/Services"><h3><FontAwesomeIcon className="f-icons" icon={faConciergeBell} /> Our Services</h3></a>
            <a href="/Contact"><h3><FontAwesomeIcon className="f-icons" icon={faEnvelope} /> Contact Us</h3></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
