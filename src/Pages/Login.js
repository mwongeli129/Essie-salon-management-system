import React, { useState } from "react";
import styles from "../Css/login.module.css"
import Scrollbutton from "../Components/Scrollbutton";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update state based on input name
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
      // Handle unexpected input names (optional)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost/Esssie/Login.php", {
        username,
        password,
      });

      if (response.data.success) {
        // Check if the logged-in user is an admin
        if (response.data.role === "admin") {
          // Redirect to admin dashboard
          window.location.href = "/AdminDashboard";
        } else {
          // Normal user login
          alert("You have successfully logged in.");
          window.location.href = "/Services";
        }
      } else {
        // Login failed, display specific error message
        alert(response.data.error); // Adjust according to your backend response structure
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <div className={styles.login_section}>
        <h1>LogIn</h1>
        <p>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username :
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter Your Username Here"
              required
            />
          </label>
          <label htmlFor="password">
            Password :
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter Your Password Here"
              required
            />
          </label>

          <input type="submit" value="Login"/>
          <p className="dont-p">
            Don't Have An Account? <a href="/Signup">Sign Up</a>
          </p>
        </form>
      </div>
      <Scrollbutton />
    </div>
  );
};

export default Login;