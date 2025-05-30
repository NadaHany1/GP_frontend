import React, { useEffect, useRef, useState } from "react";
import "../styles/Caruosel.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchContainer from "./SearchContainer";


function Caruosel() {
    const sliderRef = useRef(null);
    const itemsRef = useRef([]);
    const dotsRef = useRef([]);
    const intervalRef = useRef(null);

    const [active, setActive] = useState(0);

    const lengthItems = 4; // number of items - 1

    const reloadSlider = (index) => {
        const slider = sliderRef.current;
        const items = itemsRef.current;

        if (slider && items[index]) {
            slider.style.left = -items[index].offsetLeft + 'px';
        }

        // Update dots
        dotsRef.current.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    };

    const nextSlide = () => {
        setActive((prev) => (prev + 1 <= lengthItems ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setActive((prev) => (prev - 1 >= 0 ? prev - 1 : lengthItems));
    };

    useEffect(() => {
        reloadSlider(active);

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [active]);

    useEffect(() => {
        const handleResize = () => reloadSlider(active);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [active]);



    // for the search on the caruosel
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("text");
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const imageInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            console.log("Searching for:", searchQuery);
            setIsLoading(false);
        }, 2000);
    };

    const toggleImageSearch = () => {
        setSearchType("image");
        setIsSearchBarActive(true);
        imageInputRef.current?.click();
    };

    const toggleTextSearch = () => {
        setSearchType("text");
        setIsSearchBarActive(true);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Image selected:", file.name);
            setSearchQuery(file.name); // for demo
            setIsSearchBarActive(true);
        }
    };



    return (
        <div className="slider">

            <div className="search-overlay">
                <SearchContainer
                    isSearchBarActive={isSearchBarActive}
                    searchType={searchType}
                    searchQuery={searchQuery}
                    setSearchType={setSearchType}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    setIsSearchBarActive={setIsSearchBarActive}
                    toggleImageSearch={toggleImageSearch}
                    toggleTextSearch={toggleTextSearch}
                    imageInputRef={imageInputRef}
                    handleImageSelect={handleImageSelect}
                    isLoading={isLoading}
                />
            </div>

            <div className="list" ref={sliderRef}>
                {[1, 2, 3, 4, 5].map((num, idx) => (
                    <div
                        className="item"
                        key={idx}
                        ref={(el) => (itemsRef.current[idx] = el)}
                    >
                        <img src={`./img/${num}.jpg`} alt={`Slide ${num}`} />
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button id="prev" onClick={prevSlide}><ChevronLeftIcon fontSize="large" /></button>
                <button id="next" onClick={nextSlide}><ChevronRightIcon fontSize="large" /></button>
            </div>
            <ul className="dots">
                {[0, 1, 2, 3, 4].map((_, idx) => (
                    <li
                        key={idx}
                        className={active === idx ? "active" : ""}
                        onClick={() => setActive(idx)}
                        ref={(el) => (dotsRef.current[idx] = el)}
                    ></li>
                ))}
            </ul>
        </div>
    );
}

export default Caruosel;
