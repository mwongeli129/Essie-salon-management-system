import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/Users.css"

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users')
            .then(function (response) {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching users:', error);
            });
    }

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
                            <th className="th">Role</th>
                            <th className="th">Phone Number</th>
                            <th className="th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) =>
                            <tr key={key}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link to={`user/${user.id}/edit`}>Edit</Link>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Admin;