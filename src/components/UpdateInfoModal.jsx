import React, { useState } from 'react';
import '../styles/Modal.css';

const UpdateInfoModal = ({ providerData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: providerData.name,
    location: providerData.location,
    email: providerData.contacts.email,
    phone: providerData.contacts.phone,
    instagram: providerData.contacts.instagram,
    website: providerData.contacts.website,
    profileImage: providerData.profileImage,
    coverImage: providerData.coverImage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      name: formData.name,
      location: formData.location,
      contacts: {
        email: formData.email,
        phone: formData.phone,
        instagram: formData.instagram,
        website: formData.website
      },
      profileImage: formData.profileImage,
      coverImage: formData.coverImage
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Update Profile Information</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Instagram Link</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              type="url"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfoModal;
