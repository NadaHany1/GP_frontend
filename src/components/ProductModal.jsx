
// components/ProductModal.js
import React, { useState } from 'react';
import '../styles/Modal.css';

const ProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...product,
    newImages: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: parseFloat(value)
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleImageUpload = (e) => {
    // In a real application, you would handle file uploads to a server
    // For this example, we'll just simulate adding URLs
    const files = Array.from(e.target.files);
    
    // Simulate getting URLs for the uploaded files
    const newImageUrls = files.map(
      (_, index) => `https://via.placeholder.com/300?text=New+Image+${index + 1}`
    );
    
    setFormData(prevData => ({
      ...prevData,
      newImages: [...prevData.newImages, ...newImageUrls],
      images: [...prevData.images, ...newImageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prevData => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newImages, ...updatedProduct } = formData;
    onUpdate(updatedProduct);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content product-modal">
        <div className="modal-header">
          <h3>Update Product</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleNumberChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors.join(', ')}
              onChange={handleArrayChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes.join(', ')}
              onChange={handleArrayChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={(e) => handleNumberChange({
                target: { name: 'stock', value: parseInt(e.target.value) }
              })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              name="active"
              value={formData.active}
              onChange={(e) => setFormData({
                ...formData,
                active: e.target.value === 'true'
              })}
            >
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Product Images</label>
            <div className="image-gallery">
              {formData.images.map((img, index) => (
                <div key={index} className="image-item">
                  <img src={img} alt={`Product ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="file-input"
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

export default ProductModal;
