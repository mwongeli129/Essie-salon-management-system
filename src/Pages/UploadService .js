import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Uploadservice.css';

const UploadService = () => {
    const [serviceData, setServiceData] = useState({
        service_name: '',
        description: '',
    });
    const [serviceImage, setServiceImage] = useState(null);
    const [services, setServices] = useState([]);

    // Fetch services on component mount
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost/Esssie/getservices.php');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleImageChange = (e) => {
        setServiceImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('service_name', serviceData.service_name);
        formData.append('description', serviceData.description);
        formData.append('service_image', serviceImage);

        try {
            const response = await axios.post('http://localhost/Esssie/uploadservice.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            if (response.data.success) {
                setServiceData({ service_name: '', description: '' });
                setServiceImage(null);
                fetchServices(); // Fetch services again to update the list
            }
        } catch (error) {
            alert('Error creating service: ' + error.message);
        }
    };

    const handleEditService = async (serviceId) => {
        // Fetch the service details by serviceId and populate the form for editing
        const selectedService = services.find(service => service.id === serviceId);
        if (selectedService) {
            setServiceData({
                service_name: selectedService.service_name,
                description: selectedService.description,
            });
            // You might also want to set the service image, if needed
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            const response = await axios.post('http://localhost/Esssie/deleteservice.php', { id: serviceId });
            alert(response.data.message);
            if (response.data.success) {
                fetchServices(); // Fetch services again to update the list
            }
        } catch (error) {
            alert('Error deleting service: ' + error.message);
        }
    };

    return (
        <div className="submit-container">
            <h2>Upload New Service</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="text"
                    name="service_name"
                    placeholder="Service Name"
                    value={serviceData.service_name}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="description"
                    id="textarea"
                    placeholder="Service Description"
                    value={serviceData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <input
                    type="file"
                    name="service_image"
                    onChange={handleImageChange}
                    required
                />
                <button className="submit" type="submit">Upload Service</button>
            </form>

            {/* Display services for editing and deleting */}
            <div className="service-list">
                {services.map((service) => (
                    <div key={service.id} className="service-item">
                        <div>
                            <h3>{service.service_name}</h3>
                            <p>{service.description}</p>
                        </div>
                        <div>
                            <button className="edit-btn" onClick={() => handleEditService(service.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteService(service.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadService;
