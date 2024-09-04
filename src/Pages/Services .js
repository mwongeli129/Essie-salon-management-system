import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Styling.css";
import Scrollbutton from "../Components/Scrollbutton";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/Booking');
  }
  
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost/Esssie/getservices.php");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <div className="services-section">
        <div className="vertical-services"></div>
        <h1>
          MOST POPULAR<span> ONLINE</span> <br />
          BEST IN <span>SERVICES</span>
        </h1>
        <div className="services-container">
          {services.map((service) => (
            <div className="services" key={service.id}>
              <img src={`http://localhost/Esssie/${service.service_image}`} alt={service.service_name} className="s-images" />
              <h3>{service.service_name}</h3>
              <p>{service.description}</p>
              <button className="b-appointment" onClick={handleClick}>Book Appointment</button>
            </div>
          ))}
        </div>
      </div>
      <Scrollbutton />
    </div>
  );
};

export default Services;
