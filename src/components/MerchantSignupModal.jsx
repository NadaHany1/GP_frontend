// MerchantSignupModal.jsx
import React, { useState } from 'react';
import '../styles/Modal.css'; // Make sure this path is correct

function MerchantSignupModal() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    instagramLink: '',
    website: '',
    profileImageUrl: '',
    coverImageUrl: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleClose();
  };

  return (
    <>
      <button className="save-btn" onClick={handleShow}>
        Signup as Merchant
      </button>

      {show && (
        <div className="modal-backdrop">
          <div className="modal-content merchant-modal">
            <div className="modal-header">
              <h3>Merchant Signup</h3>
              <button className="close-btn" onClick={handleClose}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name <span className="required-marker">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tech Gadgets Supply"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location <span className="required-marker">*</span></label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Los Angeles, CA"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email <span className="required-marker">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@techgadgets.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone <span className="required-marker">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Username <span className="required-marker">*</span></label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="techgadgets"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password <span className="required-marker">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <hr className="section-divider" />
              <h5 className="section-title">Additional Information (Optional)</h5>

              <div className="form-group">
                <label>Instagram Link</label>
                <input
                  type="url"
                  name="instagramLink"
                  value={formData.instagramLink}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/techgadgetssupply"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://techgadgetssupply.com"
                />
              </div>

              <div className="form-group">
                <label>Profile Image URL</label>
                <input
                  type="url"
                  name="profileImageUrl"
                  value={formData.profileImageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/profile-image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Cover Image URL</label>
                <input
                  type="url"
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/cover-image.jpg"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MerchantSignupModal;
