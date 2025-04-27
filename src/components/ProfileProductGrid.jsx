
// components/ProductsGrid.js
import React from 'react';
import ProductCard2 from './ProductCard2';
import '../styles/ProfileProductGrid.css';

const ProfileProductsGrid = ({ 
  products, 
  isProvider, 
  onUpdateClick, 
  onAddProductClick,
  onToggleStatus 
}) => {
  return (
    <div className="products-section">
      <div className="products-header">
        <h2>Products</h2>
        {isProvider && (
          <button 
            className="add-product-btn"
            onClick={onAddProductClick}
          >
            <i className="fa fa-plus"></i> Add New Product
          </button>
        )}
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard2 
            key={product.id}
            product={product}
            isProvider={isProvider}
            onUpdateClick={() => onUpdateClick(product)}
            onToggleStatus={() => onToggleStatus(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileProductsGrid;
