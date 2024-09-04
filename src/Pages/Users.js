import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Users.css";

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost/Esssie/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const deleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost/Esssie/deleteuser.php?id=${userId}`)
                .then(response => {
                    console.log('User deleted:', response.data);
                    // Update the state to remove the deleted user
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    };

    return (
        <>
            <div className="users">
                <h1>Users</h1>
                <table className="table">
                    <thead className="t-head">
                        <tr className="table-r">
                            <th className="th">#</th>
                            <th className="th">Name</th>
                            <th className="th">Email</th>
                            <th className="th">Username</th>
                            <th className="th">ROLE</th>
                            <th className="th">Phone Number</th>
                            <th className="th">Created At</th>
                            <th className="th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) => (
                            <tr key={key}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.signin_date}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Admin;
