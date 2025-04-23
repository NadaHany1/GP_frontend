import React from 'react';
import { useState } from "react";
import '../styles/ProductCard.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";


const ProductCard = ({ product}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };
    const nextImage = () => {
        setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

  return (
    <div className="product-card">
      {/* {product.isNew && <span className="new-badge">New</span>} */}
      <div className="product-image">
        <img src={product.images[currentImage]} alt={product.name} />
        <button className="fav-btn"><FaRegHeart/></button>
        <button className="prev-btn" onClick={prevImage}><HiChevronLeft className='icon'/></button>
        <button className="next-btn" onClick={nextImage}><HiChevronRight className='icon'/></button>
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-brand">{product.brand}</span>
        <div className="product-color">
          {/* <span className="color-dot" style={{ backgroundColor: product.color.toLowerCase() }}></span> */}
          <span>{product.color}</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        {/* <button className="add-to-cart">Add to Cart</button> */}
      </div>
    </div>
  );
};

export default ProductCard;
