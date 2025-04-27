// import React, { useEffect, useState } from 'react';
// import products from '../data/product.json';
// import ProductCard from './ProductCard';
// import '../styles/Recommendations.css'
// import { fetchLastSearches } from '../services/authService';
// import { Link } from 'react-router-dom';

// const Recommendations = ({ user }) => {
//     const [recommendations, setRecommendations] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadRecommendations = async () => {
//             setLoading(true);
//             if (user) {
//                 const searches = await fetchLastSearches(user.id);
//                 const matched = products.filter(p =>
//                     searches.includes(p.name)
//                 ).slice(0, 4);
//                 setRecommendations(matched);
//             } else {
//                 const random = products.sort(() => 0.5 - Math.random()).slice(0, 4);
//                 setRecommendations(random);
//             }
//             setLoading(false);
//         };

//         loadRecommendations();
//     }, [user]);

//     return (
//         <div className="recommendations">
//             {loading ? (
//                 <div className="recommendation-skeletons">
//                     {[...Array(4)].map((_, idx) => (
//                         <div key={idx} className="skeleton-card"></div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="recommendation-grid">
//                     {recommendations.map(product => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </div>
//             )}
//             <Link to="/products" className="explore-link">Explore More</Link>
//         </div>
        
//     );
// };

// export default Recommendations;

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/Recommendations.css';
import { fetchLastSearches } from '../services/authService';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';  // Import the service

const Recommendations = ({ user }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            setLoading(true);
            try {
                const products = await getProducts();  // Fetch product data from the API
                if (user) {
                    const searches = await fetchLastSearches(user.id);
                    const matched = products.filter(p =>
                        searches.includes(p.name)
                    ).slice(0, 4);
                    setRecommendations(matched);
                } else {
                    const random = products.sort(() => 0.5 - Math.random()).slice(0, 4);
                    setRecommendations(random);
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                // Handle error (you might want to set a state to show an error message)
            }
            setLoading(false);
        };

        loadRecommendations();
    }, [user]);

    return (
        <div className="recommendations">
            {loading ? (
                <div className="recommendation-skeletons">
                    {[...Array(4)].map((_, idx) => (
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
