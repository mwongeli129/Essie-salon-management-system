import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "../Css/MpesaPopup.module.css";

const MpesaPopup = ({ onClose, bookingId }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    mpesaNumber: '',
    amount: '',
    bookingId: bookingId
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPaymentDetails(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/Esssie/payment.php', paymentDetails);
      console.log('Payment response:', response.data);
      if (response.data.success) {
        alert("Payment successful!");
        onClose();
        navigate('/services'); // Redirect to the Services component
      } else {
        alert("Payment failed: " + response.data.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert("Error while processing payment: " + error.message);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <h2>Complete Your Payment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mpesaNumber">Mpesa Number:</label>
            <input 
              type="text"
              name="mpesaNumber"
              onChange={handleChange}
              placeholder="Enter your Mpesa number"
              required 
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input 
              type="number"
              name="amount"
              onChange={handleChange}
              placeholder="Enter the amount"
              required 
            />
          </div>
          <div className={styles.buttons}>
            <input className={styles.submit} type="submit" value="Submit Payment" />
            <button type="button" onClick={() => onClose(null)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MpesaPopup;
