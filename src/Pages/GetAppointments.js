import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/Users.css";

const GetAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = () => {
        axios.get('http://localhost/Esssie/getappointments.php')
            .then(response => {
                setAppointments(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    };

    const cancelAppointment = (appointmentId) => {
        console.log("Cancelling appointment with ID:", appointmentId); // Debugging line
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            axios.delete(`http://localhost/Esssie/cancelappointment.php?id=${appointmentId}`)
                .then(response => {
                    console.log('Delete response:', response.data); // Debugging line
                    if (response.data.success) {
                        console.log('Appointment canceled:', response.data);
                        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
                    } else {
                        console.error('Error canceling appointment:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error canceling appointment:', error);
                });
        }
    };

    return (
        <>
            <div className="users">
                <h1>Appointments</h1>
                <table className="table">
                    <thead className="t-head">
                        <tr className="table-r">
                            <th className="th">#</th>
                            <th className="th">Full Name</th>
                            <th className="th">Email</th>
                            <th className="th">Service</th>
                            <th className="th">Appointment Date</th>
                            <th className="th">Appointment Time</th>
                            <th className="th">Payment Method</th>
                            <th className="th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, key) => (
                            <tr key={key}>
                                <td>{appointment.id}</td>
                                <td>{appointment.fullName}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.service || "N/A"}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.paymentMethod}</td>
                                <td>
                                    <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GetAppointments;
