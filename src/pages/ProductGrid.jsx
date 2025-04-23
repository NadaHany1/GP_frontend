import React, { useState } from 'react';
import '../styles/ProductGrid.css';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import SortDropdown from '../components/SortDropdown';
import products from '../data/product.json';

const ProductGrid = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState('similarity');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sortOptions = [
    { value: 'relevance', label: 'Sort by' },
    { value: 'similarity', label: 'Similarity' },
    { value: 'nameAZ', label: 'Name (A to Z)' },
    { value: 'nameZA', label: 'Name (Z to A)' },
    { value: 'priceHL', label: 'Price (High to Low)' },
    { value: 'priceLH', label: 'Price (Low to High)' },
    { value: 'new', label: 'New Products' }
  ];


  return (
    <div className="product-page">
      <header className="header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        <h1>Search Results</h1>
        <SortDropdown options={sortOptions} value={sortBy} onChange={setSortBy} />
      </header>

      <div className="content">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductGrid;
