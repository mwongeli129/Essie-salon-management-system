import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Users.css";

const Getpayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = () => {
        axios.get('http://localhost/Esssie/getpayments.php')
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    };

    {/*const cancelPayments = (appointmentId) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            axios.delete(`http://localhost/Esssie/cancelappointment.php?id=${paymentId}`)
                .then(response => {
                    if (response.data.success) {
                        console.log('Appointment canceled:', response.data);
                        setPayments(payments.filter(payment => payment.id !== paymentId));
                    } else {
                        console.error('Error canceling appointment:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error canceling appointment:', error);
                });
        }
    };*/}

    return (
        <>
            <div className="users">
                <h1>Payments</h1>
                <table className="table">
                    <thead className="t-head">
                        <tr className="table-r">
                            <th className="th">#</th>
                            <th className="th">Full Name</th>
                            <th className="th">Mpesa Number</th>
                            <th className="th">Amount</th>
                            <th className="th">Date Payed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, key) => (
                            <tr key={key}>
                                <td>{payment.id}</td>
                                <td>{payment.fullname}</td>
                                <td>{payment.mpesaNumber}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.paymentDate}</td>
                                {/*<td>
                                    <button onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                </td>*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Getpayments;
