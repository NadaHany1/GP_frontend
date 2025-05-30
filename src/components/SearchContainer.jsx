// src/components/SearchContainer.jsx
import "../styles/SearchContainer.css";

import { useRef } from "react";

const SearchContainer = ({
    isSearchBarActive,
    searchType,
    searchQuery,
    setSearchType,
    setSearchQuery,
    handleSearch,
    setIsSearchBarActive,
    toggleImageSearch,
    toggleTextSearch,
    imageInputRef,
    handleImageSelect,
    isLoading
}) => {
    return (
        <div className="search-container">
            {isSearchBarActive ? (
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-submit-btn" disabled={isLoading}>
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                    <button
                        type="button"
                        className="search-cancel-btn"
                        onClick={() => setIsSearchBarActive(false)}
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="search-bars">
                    <button onClick={toggleTextSearch} className="search-btn">
                        <i className="fas fa-search"></i> Text Search
                    </button>
                    <button onClick={toggleImageSearch} className="search-btn">
                        <i className="fas fa-image"></i> Image Search
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                className="image-input"
                ref={imageInputRef}
                onChange={handleImageSelect}
                style={{ display: "none" }}
            />
        </div>
    );
};

export default SearchContainer;
