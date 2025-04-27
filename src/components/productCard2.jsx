import { useState } from 'react';
import '../styles/ProductCard.css';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa6';

const ProductCard = ({ product, isProvider, onUpdateClick, onToggleStatus }) => {
  const [hover, setHover] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className={`product-card ${!product.active ? 'disabled' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="product-image">
        <img src={product.images[currentImage]} alt={product.name} />
        
        {/* Fav Button for normal use (not for providers) */}
        {!isProvider && (
          <button className="fav-btn">
            <FaRegHeart />
          </button>
        )}
        
        {/* Image Navigation Buttons */}
        <button className="prev-btn" onClick={prevImage}><HiChevronLeft className='icon'/></button>
        <button className="next-btn" onClick={nextImage}><HiChevronRight className='icon'/></button>

        {/* Actions for Providers */}
        {isProvider && hover && (
          <div className="product-actions">
            <button 
              className="update-btn"
              onClick={onUpdateClick}
            >
              <i className="fa fa-pencil"></i> Update
            </button>
            
            <button 
              className={`toggle-btn ${product.active ? 'disable-btn' : 'enable-btn'}`}
              onClick={onToggleStatus}
            >
              <i className={`fa fa-${product.active ? 'ban' : 'check'}`}></i>
              {product.active ? 'Disable' : 'Enable'}
            </button>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-colors">
          {product.colors.map((color, index) => (
            <span key={index} className="color-badge">{color}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
