import React, { useState } from 'react';
import '../styles/Profile.css';
// import { useAuth } from '../contexts/AuthContext';

const useAuth = () => {
  return {
    user: { name: 'Yahia' },  // Mocked user data
    isAuthenticated: true // Mocked as if the user is signed in
  };
};

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    pronouns: '',
    website: '',
    username: '',
    phoneNumber: '',
    birthdate: '',
    gender: '',
    country: 'Egypt',
    language: 'English (US)',
    profilePicture: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { user, isAuthenticated } = useAuth(); // Check if user is authenticated

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setSuccessMessage('✅ Profile updated successfully!');
    console.log('Saved data:', formData);

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    // Reset form data to default values
    setFormData({
      firstName: '',
      lastName: '',
      about: '',
      pronouns: '',
      website: '',
      username: '',
      phoneNumber: '',
      birthdate: '',
      gender: '',
      country: 'Egypt',
      language: 'English (US)',
      profilePicture: ''
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: ''
    }));
  };

  const handleLoginRedirect = () => {
    alert('You need to log in to edit your profile.');
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="photo-section">
        {formData.profilePicture ? (
          <img src={formData.profilePicture} alt="Profile" className="photo-placeholder" />
        ) : (
          <div className="photo-placeholder">
            {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : ''}
          </div>
        )}

        <div className="photo-buttons">
          <label htmlFor="photo-upload" className="change-button">Change</label>
          {formData.profilePicture && typeof formData.profilePicture === 'string' && (
            <button
              type="button"
              className="remove-photo-button"
              onClick={handleRemovePhoto}
              disabled={!isEditing}
            >
              Cancel Photo
            </button>
          )}

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
            disabled={!isEditing}
          />
        </div>
      </div>

      <form className="profile-form">
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            disabled={!isEditing}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            disabled={!isEditing}
          />
        </div>

        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="Tell your story"
          disabled={!isEditing}
        ></textarea>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://"
          disabled={!isEditing}
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          disabled={!isEditing}
        />

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone number"
          disabled={!isEditing}
        />

        <h3>Personal Information</h3>

        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div className="gender-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              disabled={!isEditing}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              disabled={!isEditing}
            /> Female
          </label>
        </div>

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="">Select a country</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Belgium">Belgium</option>
          <option value="Brazil">Brazil</option>
          <option value="Canada">Canada</option>
          <option value="China">China</option>
          <option value="Egypt">Egypt</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
          <option value="Italy">Italy</option>
          <option value="Japan">Japan</option>
          <option value="Mexico">Mexico</option>
          <option value="Morocco">Morocco</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Qatar">Qatar</option>
          <option value="Russia">Russia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Turkey">Turkey</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Other">Other</option>

        </select>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="">Select a language</option>
          <option value="Arabic">Arabic</option>
          <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
          <option value="Dutch">Dutch</option>
          <option value="English (US)">English (US)</option>
          <option value="English (UK)">English (UK)</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Russian">Russian</option>
          <option value="Spanish">Spanish</option>
          <option value="Turkish">Turkish</option>
          <option value="Urdu">Urdu</option>
          <option value="Other">Other</option>
        </select>

        <div className="buttons">
          {isEditing ? (
            <>
              <button type="button" onClick={handleReset} className="reset-button">
                Reset
              </button>
              <button type="button" onClick={handleSave} className="save-button">
                Save
              </button>
            </>
          ) : isAuthenticated ? (
            // Show "Edit Profile" if the user is logged in
            <button type="button" onClick={() => setIsEditing(true)} className="edit-button">
              Edit Profile
            </button>
          ) : (
            // If not logged in, show "Log in to Edit Profile" button
            <button type="button" onClick={handleLoginRedirect} className="signup-prompt-button edit-button">
              Log in to Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;