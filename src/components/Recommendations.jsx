import React, { useEffect, useState } from 'react';
import products from '../data/product.json';
import ProductCard from './ProductCard';
import '../styles/Recommendations.css'
import { fetchLastSearches } from '../services/authService';
import { Link } from 'react-router-dom';

const Recommendations = ({ user }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            setLoading(true);
            if (user) {
                const searches = await fetchLastSearches(user.id);
                const matched = products.filter(p =>
                    searches.includes(p.name)
                ).slice(0, 5);
                setRecommendations(matched);
            } else {
                const random = products.sort(() => 0.5 - Math.random()).slice(0, 5);
                setRecommendations(random);
            }
            setLoading(false);
        };

        loadRecommendations();
    }, [user]);

    return (
        <div className="recommendations">
            {loading ? (
                <div className="recommendation-skeletons">
                    {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="skeleton-card"></div>
                    ))}
                </div>
            ) : (
                <div className="recommendation-grid">
                    {recommendations.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
            <Link to="/products" className="explore-link">Explore More</Link>
        </div>
        
    );
};

export default Recommendations;