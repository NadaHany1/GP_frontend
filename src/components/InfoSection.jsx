// components/InfoSection.js
import React, { useState } from 'react';
import UpdateInfoModal from './UpdateInfoModal';
import '../styles/InfoSection.css';

const InfoSection = ({ providerData, isProvider, onUpdateData, onLocationClick }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const { name, location, rating, productCount, contacts } = providerData;

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleUpdate = (updatedData) => {
    onUpdateData(updatedData);
    setShowUpdateModal(false);
  };

  return (
    <div className="info-section-container">
      <div className="info-section">
        <div className="info-left">
          <h1 className="provider-name">{name}</h1>
          <div className="rating">
            <span className="stars">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fa fa-star ${i < Math.floor(rating) ? 'filled' : 'empty'}`}
                />
              ))}
            </span>
            <span className="rating-value">{rating}</span>
          </div>
          <p className="location">
            <i className="fa fa-map-marker"></i>
            <span className="location-text" onClick={onLocationClick}>
              {location}
            </span>
          </p>
          <p className="product-count">
            <i className="fa fa-box"></i> {productCount} Products
          </p>
        </div>
        
        <div className="info-right">
          <h3>Contact Information</h3>
          <div className="contact-info">
            {contacts.email && (
              <p>
                <i className="fa fa-envelope"></i> {contacts.email}
              </p>
            )}
            {contacts.phone && (
              <p>
                <i className="fa fa-phone"></i> {contacts.phone}
              </p>
            )}
            {contacts.website && (
              <p>
                <a href={contacts.website} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe"></i> Website
                </a>
              </p>
            )}
            {contacts.instagram && (
              <p>
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram"></i> Instagram
                </a>
              </p>
            )}
          </div>
        </div>
        
        {isProvider && (
          <button 
            className="update-info-btn"
            onClick={handleUpdateClick}
          >
            <i className="fa fa-pencil"></i> Update Info
          </button>
        )}
      </div>
      
      {showUpdateModal && (
        <UpdateInfoModal 
          providerData={providerData}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default InfoSection;
