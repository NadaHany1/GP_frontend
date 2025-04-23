import React, { useEffect, useState, useRef } from "react";
import "../styles/CategorySection.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import categoriesData from "../data/categories.json";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    setCategories(categoriesData); // load from local JSON
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="category-wrapper">
      <button className="arrow left" onClick={scrollLeft}>
        <ArrowBackIosIcon />
      </button>

      <div className="category-container" ref={containerRef}>
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <img src={cat.image} alt={cat.name} />
            <div className="overlay">
              <h3>{cat.name}</h3>
              <Link to={cat.link} className="view-link">View Products</Link>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={scrollRight}>
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default CategorySection;
