import React, { useState } from 'react';
import '../styles/ContactUs.css';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Submission failed', error);
        }
    };

    return (
        <div className="contact-us">
            {/* contact details section */}
            <div className="contact-details">
                <div className="details-item">
                    <h2>Address:</h2>
                    <p>Helwan University</p>
                </div>
                <div className="details-item">
                    <h2>Phone:</h2>
                    <p>01011155600</p>
                </div>
                <div className="details-item">
                    <h2>Email:</h2>
                    <p>helwan@gmail.com</p>
                </div>
            </div>
            {/* contact form */}
            <div className="contact-form">
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." required></textarea>
                    <button type="submit">Send</button>
                    {success && <p className="success-msg">Message submitted for approval.</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
