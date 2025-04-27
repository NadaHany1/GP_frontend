// components/ProfileHeader.js
import React from 'react';
import '../styles/ProfileHeader.css';

const ProfileHeader = ({ profileImage, coverImage }) => {
  return (
    <div className="profile-header">
      <div 
        className="cover-image" 
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="profile-image-container">
          <img 
            src={profileImage} 
            alt="Provider Profile" 
            className="profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
