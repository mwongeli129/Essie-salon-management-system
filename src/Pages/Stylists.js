import React, { useEffect, useState } from "react";
import axios from "axios";
import Scrollbutton from "../Components/Scrollbutton";
import '../Css/Team.css';

const Stylists = () => {
  
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get("http://localhost/Esssie/getstylists.php");
        if (Array.isArray(response.data)) {
          setStylists(response.data);
        } else {
          console.error("Error: API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching stylists:", error);
      }
    };

    fetchStylists();
  }, []);

  return (
    <div>
      <div className="Team-section">
          <div className="vertical-Team"></div>
          <h1 className="our-Team">
            MEET OUR <span>TEAM</span>
          </h1>
        <div className="Team-container">
          {Array.isArray(stylists) && stylists.length > 0 ? (
            stylists.map((stylist) => (
              <div className="Team" key={stylist.id}>
                <div className="curve"></div>
                <div className="oval"></div>
                <img className="t1" src={`http://localhost/Esssie/${stylist.image}`} alt={stylist.name} />
                <h3>{stylist.name}</h3>
                <h4>{stylist.role}</h4>
                <div className="t-info"></div>
              </div>
            ))
          ) : (
            <p>No stylists found.</p>
          )}
        </div>
      </div>
      <Scrollbutton />
    </div>
  );
};

export default Stylists;
