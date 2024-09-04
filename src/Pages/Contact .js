import React, { useRef, useState } from 'react';
import Scrollbutton from '../Components/Scrollbutton';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import styles from "../Css/contact.module.css";

const Contact = () => {
  const form = useRef();
  const [inputs, setInputs] = useState({
    user_name: '',
    user_email: '',
    user_tel: '',
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8ml0cb8', 'template_rhf0ikn', form.current, {
        publicKey: 'ZR5Xxf0yJH0hkSOx-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          console.log('message sent');
          alert("Thank you for contacting Freddy!");
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

    sendFormDataToBackend();
  };

  const sendFormDataToBackend = () => {
    axios.post('http://localhost/Esssie/contact_messages.php', inputs)
      .then(response => {
        console.log('Form data sent to backend:', response);
      })
      .catch(error => {
        console.log('Error sending form data to backend:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <div>
      <div className={styles.contact}>
        <div className={styles.getIntouch}>
          <h1>Get in <span>Touch</span> with Us</h1>
        </div>
        <div className={styles.divFloats}>
          <div className={styles.contactDivision}>
            <div className={styles.cDiv}>
              <h3>Our Home Address</h3>
              <p>Mombasa, Tudor</p>
            </div>
            <div className={styles.cDiv}>
              <h3>Our Email Address</h3>
              <p>mwongeli129@gmail.com</p>
            </div>
            <div className={styles.cDiv}>
              <h3>Our Phone</h3>
              <p>+254 740290363</p>
              <p>+254 115030267</p>
            </div>
          </div>
          <div className={styles.contactB}>
            <div className={styles.form}>
              <form ref={form} onSubmit={sendEmail}>
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    value={inputs.user_name}
                    required
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    value={inputs.user_email}
                    required
                    onChange={handleChange}
                  />
                  <input
                    type="tel"
                    name="user_tel"
                    placeholder="Your Number"
                    value={inputs.user_tel}
                    required
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Enter Your message"
                    value={inputs.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button className={styles.contactButton} type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
          <div className="map">
                        <iframe className="iframe"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13340.630961382366!2d39.64913482980957!3d-4.0482807999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012b8a08fdd8d%3A0x9f689ea8a93e17bc!2sTudor%2C%20Mombasa%2C%20Kenya!5e0!3m2!1sen!2s!4v1595226534693!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            title="map"
                        ></iframe>
                    </div>
      </div>
      <Scrollbutton />
    </div>
  );
};

export default Contact;
