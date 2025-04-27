// components/AddProductModal.js
import React, { useState } from 'react';
import '../styles/Modal.css';

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    colors: '',
    sizes: '',
    stock: '',
    active: true,
    images: [],
    bulkImport: false
  });
  
  const [bulkData, setBulkData] = useState('');

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
      images: [...prevData.images, ...newImageUrls]
    }));
  };
  
  const handleBulkFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real application, you would parse the file and extract product data
    // For this example, we'll just simulate reading the file
    const reader = new FileReader();
    reader.onload = (event) => {
      setBulkData(event.target.result);
    };
    reader.readAsText(file);
  };

  const removeImage = (index) => {
    setFormData(prevData => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.bulkImport && bulkData) {
      // In a real application, you would process the bulk data here
      // For this example, we'll just create a dummy product
      onAdd({
        name: "Bulk Imported Product",
        price: 99.99,
        description: "This product was imported from bulk data",
        brand: "BulkImport",
        colors: ["Various"],
        sizes: ["Various"],
        stock: 100,
        active: true,
        images: ["https://via.placeholder.com/300?text=Bulk+Import"]
      });
    } else {
      onAdd({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        brand: formData.brand,
        colors: formData.colors.split(',').map(color => color.trim()),
        sizes: formData.sizes.split(',').map(size => size.trim()),
        stock: parseInt(formData.stock),
        active: formData.active,
        images: formData.images
      });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content product-modal">
        <div className="modal-header">
          <h3>Add New Product</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="import-toggle">
            <label>
              <input
                type="checkbox"
                checked={formData.bulkImport}
                onChange={(e) => setFormData({
                  ...formData,
                  bulkImport: e.target.checked
                })}
              />
              Bulk Import Products
            </label>
          </div>
          
          {formData.bulkImport ? (
            <div className="form-group">
              <label>Upload Product Data File</label>
              <input
                type="file"
                accept=".csv,.json,.xlsx"
                onChange={handleBulkFileUpload}
                className="file-input"
              />
              {bulkData && (
                <div className="bulk-data-preview">
                  <p>File loaded successfully</p>
                </div>
              )}
            </div>
          ) : (
            <>
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
                  value={formData.colors}
                  onChange={handleChange}
                  placeholder="Red, Blue, Green"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Sizes (comma separated)</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={(e) => handleChange({
                    target: { name: 'stock', value: e.target.value }
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
            </>
          )}
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;