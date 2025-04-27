// components/ProviderProfile.js
import React, { useState } from 'react';
import ProfileHeader from '../components/ProviderProfileHeader';
import InfoSection from '../components/InfoSection';
import ProfileProductsGrid from '../components/ProfileProductGrid';
import ProductModal from '../components/ProductModal';
import AddProductModal from '../components/AddProductModal';
import MapModal from '../components/MapModal';
import '../styles/ProviderProfile.css';
import ProviderData from '../data/providerData.json';
import Products from '../data/product.json';
// Moved sample data inside
// const initialProviderData = {
//   id: 1,
//   name: "Tech Gadgets Supply",
//   location: "Los Angeles, CA",
//   coordinates: { lat: 34.0522, lng: -118.2437 },
//   rating: 4.8,
//   productCount: 37,
//   contacts: {
//     email: "contact@techgadgets.com",
//     phone: "+1 (555) 123-4567",
//     instagram: "https://instagram.com/techgadgetssupply",
//     website: "https://techgadgetssupply.com"
//   },
//   profileImage: "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/09/women-fashion-and-women-clothing.png",
//   coverImage: "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/09/women-fashion-and-women-clothing.png",
//   isProvider: false
// };

// const initialProducts = [
//   {
//     id: 1,
//     name: "Wireless Earbuds",
//     price: 59.99,
//     colors: ["Black", "White", "Blue"],
//     description: "High-quality wireless earbuds with noise cancellation",
//     sizes: ["One Size"],
//     brand: "SoundWave",
//     images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"],
//     active: true,
//     stock: 25
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 129.99,
//     colors: ["Black", "Silver"],
//     description: "Fitness tracker with heart rate monitor",
//     sizes: ["S", "M", "L"],
//     brand: "FitTech",
//     images: ["https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?cs=srgb&dl=pexels-kowalievska-1055691.jpg&fm=jpg"],
//     active: true,
//     stock: 15
//   },
//   // ... (rest of the products)
// ];

const ProviderProfile = () => {
  const [providerData, setProviderData] = useState(ProviderData);
  const [products, setProducts] = useState(Products);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const updateProviderData = (newData) => {
    setProviderData({ ...providerData, ...newData });
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const addProduct = (newProduct) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
  };

  const toggleProductStatus = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, active: !product.active } : product
    ));
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleProductUpdate = (updatedProduct) => {
    updateProduct(updatedProduct);
    setShowProductModal(false);
  };

  const handleProductAdd = (newProduct) => {
    addProduct(newProduct);
    setShowAddProductModal(false);
  };

  const handleLocationClick = () => {
    setShowMapModal(true);
  };

  return (
    <div className="provider-profile-container">
      <ProfileHeader 
        profileImage={providerData.profileImage}
        coverImage={providerData.coverImage}
      />
      
      <InfoSection 
        providerData={providerData}
        isProvider={providerData.isProvider}
        onUpdateData={updateProviderData}
        onLocationClick={handleLocationClick}
      />
      
      <ProfileProductsGrid 
        products={products}
        isProvider={providerData.isProvider}
        onUpdateClick={handleUpdateClick}
        onAddProductClick={handleAddProductClick}
        onToggleStatus={toggleProductStatus}
      />
      
      {showProductModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setShowProductModal(false)}
          onUpdate={handleProductUpdate}
        />
      )}
      
      {showAddProductModal && (
        <AddProductModal 
          onClose={() => setShowAddProductModal(false)}
          onAdd={handleProductAdd}
        />
      )}
      
      {showMapModal && (
        <MapModal 
          location={providerData.location}
          coordinates={providerData.coordinates}
          onClose={() => setShowMapModal(false)}
        />
      )}
    </div>
  );
};

export default ProviderProfile;
