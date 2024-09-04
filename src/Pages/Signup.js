
import React, { useState } from "react";
import axios from "axios";
import Scrollbutton from "../Components/Scrollbutton";
import styles from "../Css/Signup.module.css";

const Signup = () => {
    const [inputs, setInputs] = useState({});
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submissionData = { ...inputs, password };

        try {
            const { data } = await axios.post('http://localhost/Esssie/user/save', submissionData);

            if (data.success) {
                alert("Record created successfully!");
                window.location.href = "/Login";
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error creating record: " + error.message);
        }
    };

    return (
        <div>
            <div className={styles.signin_container}>
                <form onSubmit={handleSubmit}>
                    <h2>Create account</h2>
                    <div className={styles.overral_divs}>
                        <div className={styles.div1}>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    placeholder="Your Username"
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.div2}>
                            <div>
                                <select className={styles.select} name="role" onChange={handleChange} required>
                                    <option value="">Select Your Role</option>
                                    <option value="client">Client</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <input
                                    type="tel"
                                    name="phonenumber"
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                    required
                                />
                            </div>
                            <div>
                                <div className={styles.container}>
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={styles.input}
                                        placeholder="Enter your password"
                                        name="password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={styles.toggleButton}
                                    >
                                        {isPasswordVisible ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div">
                        <input type="submit" name="submit" value="Register" />
                    </div>
                    <div className="div-p">
                        <p>Already have an account? <a href="/Login"><span>Log In</span></a></p>
                    </div>
                </form>
            </div>
            <Scrollbutton />
        </div>
    );
};



export default Signup;
