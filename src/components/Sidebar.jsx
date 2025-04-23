import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  // Filter categories with their options
  const filterCategories = [
    {
      name: 'Brand',
      options: ['FashionCo', 'DenimWorks', 'WinterWardrobe', 'SunnyStyle', 'UrbanEdge', 
                'ComfortWear', 'ClassicStyle', 'FormalFit', 'ActiveLife', 'OutdoorGear']
    },
    {
      name: 'Color',
      options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Brown', 'Grey', 'Navy', 'Pink', 'Purple', 'Orange']
    },
    {
      name: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
    },
    {
      name: 'Price Range',
      type: 'range',
      min: 0,
      max: 200
    }
  ];

  // State to track expanded filters and price range
  const [expandedFilters, setExpandedFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });

  // Toggle expanded state for a filter category
  const toggleExpanded = (categoryName) => {
    setExpandedFilters({
      ...expandedFilters,
      [categoryName]: !expandedFilters[categoryName]
    });
  };

  // Handle price range changes
  const handlePriceChange = (type, value) => {
    setPriceRange({
      ...priceRange,
      [type]: parseInt(value)
    });
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2 className="sidebar-title">Filters</h2>
      
      {filterCategories.map((category) => (
        <div className="filter-section" key={category.name}>
          <h3 className="filter-title">{category.name}</h3>
          
          {category.type === 'range' ? (
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>From:</label>
                  <input 
                    type="number" 
                    value={priceRange.min} 
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    min="0"
                    max={priceRange.max}
                  />
                </div>
                <div className="price-input-group">
                  <label>To:</label>
                  <input 
                    type="number" 
                    value={priceRange.max} 
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    min={priceRange.min}
                  />
                </div>
              </div>
              <div className="range-slider">
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="filter-options">
              {category.options.slice(0, expandedFilters[category.name] ? category.options.length : 4).map(option => (
                <label className="filter-option" key={option}>
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="option-label">{option}</span>
                </label>
              ))}
              
              {category.options.length > 4 && (
                <button 
                  className="view-more" 
                  onClick={() => toggleExpanded(category.name)}
                >
                  {expandedFilters[category.name] ? 'View Less' : 'View More'}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      
      <button className="apply-filters">Apply Filters</button>
    </aside>
  );
};

export default Sidebar;