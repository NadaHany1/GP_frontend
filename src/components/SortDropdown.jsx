import React, { useState, useRef, useEffect } from 'react';
import '../styles/SortDropdown.css';

const SortDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Find the current selected option label
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : 'Sort by'} 
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div 
              key={option.value} 
              className={`dropdown-item ${value === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;