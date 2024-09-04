import React, { useState, useEffect } from "react";
import axios from "axios";
import Scrollbutton from '../Components/Scrollbutton';
import MpesaPopup from "./MpesaPopup";
import styles from "../Css/Booking.module.css";

const Booking = () => {
  const [inputs, setInputs] = useState({});
  const [services, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost/Esssie/getservices.php');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost/Esssie/booking.php', inputs);
      
      if (data.success) {
        setBookingId(data.bookingId);
        if (inputs.paymentMethod === 'mpesa') {
          setShowPopup(true);
        } else {
          alert("Booking successful!");
        }
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error While Booking: " + error.message);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div>
        <div className={styles.Booking_container}>
          <form onSubmit={handleSubmit}>
            <h2>Book Now</h2>
            <div className={styles.overral_divs}>
              <div className={styles.div1}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Write Your Full Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Write Your email here"
                    required />
                </div>
                <div>
                  <label htmlFor="appointment-date">
                    Appointment Date:
                    <input
                      type="date"
                      name="appointmentDate"
                      onChange={handleChange}
                      required />
                  </label>
                </div>
              </div>

              <div className={styles.div2}>
                <div>
                  <select className="select"
                    name="service"
                    onChange={handleChange}
                    required>
                    <option value="">Select Service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.service_name}>{service.service_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select className="select"
                    name="paymentMethod"
                    onChange={handleChange}
                    required>
                    <option value="">Select Your Payment Method</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="check">Check</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="appointment-time">
                    Appointment Time:
                    <input
                      type="time"
                      name="appointmentTime"
                      onChange={handleChange}
                      required />
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.div}>
              <input type="submit" name="submit" value="Submit" />
            </div>
          </form>
        </div>
        <Scrollbutton />
      </div>
      {showPopup && <MpesaPopup onClose={handlePopupClose} bookingId={bookingId} />}
    </>
  );
};

export default Booking;
