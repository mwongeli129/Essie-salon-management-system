import React, { useState } from 'react';
import axios from 'axios';
import '../Css/add_stylist.css';

const AddStylist = () => {
    const [stylistData, setStylistData] = useState({
        name: '',
        role: ''
    });
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStylistData({ ...stylistData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', stylistData.name);
        formData.append('role', stylistData.role);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost/Esssie/addstylist.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            if (response.data.success) {
                setStylistData({ name: '', role: '' });
                setImage(null);
            }
        } catch (error) {
            alert('Error adding stylist: ' + error.message);
        }
    };

    return (
        <div className="add-stylist-container">
            <h2>Add New Stylist</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    id="text"
                    name="name"
                    placeholder="Name"
                    value={stylistData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Role"
                    value={stylistData.role}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="file"
                    id="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                />
                <button className="submit" type="submit">Add Stylist</button>
            </form>
        </div>
    );
};

export default AddStylist;
