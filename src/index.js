import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from './Pages/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Footer from './Components/Footer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Booking from './Pages/Booking';
import AdminDashboard from './Pages/AdminDashboard';
import Services from './Pages/Services ';
import Contact from './Pages/Contact ';
import Stylists from './Pages/Stylists';
import MpesaPopup from './Pages/MpesaPopup';
import Review from './Pages/Review';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/About" element={<About />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Stylists" element={<Stylists />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/MpesaPopup" element={<MpesaPopup />} />
        <Route path="/AdminDashboard/*" element={<AdminDashboard/>} />
        



      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

