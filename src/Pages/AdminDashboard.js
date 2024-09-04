import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Users from '../Pages/Users';
import GetAppointments from './GetAppointments'
import UploadService from './UploadService ';
import AddStylist from './AddStylist';
import GetPayments from './Getpayments';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav>
                <ul>
                    <li><NavLink to="users" activeclasname="active"><span>Users</span></NavLink></li>
                    <li><NavLink to="GetAppointments" activeclasname="active"><span>Appointments</span></NavLink></li>
                    <li><NavLink to="GetPayments" activeclasname="active"><span>Payments</span></NavLink></li>
                    <li><NavLink to="UploadService" activeclasname="active"><span>Upload New Service</span></NavLink></li>
                    <li><NavLink to="AddStylist" activeclasname="active"><span>Add New Stylist</span></NavLink></li>

                </ul>
            </nav>
            <div className="admin-content">
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="users" element={<Users />} />
                    <Route path="GetAppointments" element={<GetAppointments />} />
                    <Route path="GetPayments" element={<GetPayments />} />
                    <Route path="UploadService" element={<UploadService />} />
                    <Route path="AddStylist" element={<AddStylist />} />

                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;