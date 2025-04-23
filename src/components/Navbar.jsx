import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import SignupModal from "./SignupModal";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // We'll make this utility next
import SearchContainer from "./SearchContainer";

function Navbar() {
  // State for controlling UI elements
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [searchType, setSearchType] = useState(""); // "text" or "image"
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const imageInputRef = useRef(null);
  const imagePreviewRef = useRef(null);
  const cropAreaRef = useRef(null);

  // Toggle search bar
  const toggleTextSearch = () => {
    setSearchType("text");
    setIsSearchBarActive(true);
  };

  // Handle image search
  const toggleImageSearch = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowImageEditor(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // after the crop finished
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const croppedImgUrl = await getCroppedImg(selectedImage, croppedAreaPixels);
      setCroppedImage(croppedImgUrl);
      setShowImageEditor(false);

      // Mock search
      setTimeout(() => {
        alert("Image search processed successfully!");
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };


  // Cancel cropping
  const cancelCrop = () => {
    setSelectedImage(null);
    setShowImageEditor(false);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchType === "text" && searchQuery.trim()) {
      setIsLoading(true);

      // Mock API call
      setTimeout(() => {
        setIsLoading(false);
        alert(`Search results for: ${searchQuery}`);
        setIsSearchBarActive(false);
        setSearchQuery("");
      }, 1000);
    }
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!email || !password) {
      setFormError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, we'll just check if the email contains "@"
      if (email.includes("@@")) {
        setFormSuccess("Login successful!");
        setTimeout(() => {
          setShowLoginModal(false);
          setEmail("");
          setPassword("");
          setFormSuccess("");
        }, 1500);
      } else {
        setFormError("Invalid email or password");
      }
    }, 1000);
  };

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!email || !password || !confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, simple validation
      if (email.includes("@") && password.length >= 6) {
        setFormSuccess("Account created successfully!");
        setTimeout(() => {
          setShowSignupModal(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFormSuccess("");
        }, 1500);
      } else {
        setFormError("Invalid email or password too short (min 6 characters)");
      }
    }, 1000);
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container") && !e.target.closest(".search-bars")) {
        setIsSearchBarActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close modals when clicking outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowLoginModal(false);
        setShowSignupModal(false);
        setShowImageEditor(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);


  const handleShowSignupModal = (show1, onHide1) => {
    return () => {
      <SignupModal show={show1} onHide={onHide1}></SignupModal>
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className="logo">
          <Link to="/"><h1>Insta<span>Finder</span></h1></Link>
        </div>

        {/* <div className="search-container">
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
              <button onClick={toggleImageSearch} className="search-btn">
                <i className="fas fa-image"></i> Image Search
              </button>
              <button onClick={toggleTextSearch} className="search-btn">
                <i className="fas fa-search"></i> Text Search
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="image-input"
            ref={imageInputRef}
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </div> */}

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


        <div className={`nav-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/products"><button className="nav-btn">products</button></Link>
          <Link to="/"><button className="nav-btn">Favourites</button></Link>
          <button className="nav-btn" onClick={() => setShowSignupModal(true)}>Signup</button>
          <button className="nav-btn" onClick={() => setShowLoginModal(true)}>Login</button>
        </div>
      </nav>

      {/* Image Editor Modal */}
      {showImageEditor && selectedImage && (
        <div className="modal-overlay">
          <div className="modal-content image-editor">
            <h2>Crop Image</h2>

            {/* Cropper Container */}
            <div className="image-preview" style={{ position: 'relative', width: '100%', height: 300 }}>
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1} // square crop; you can change this if needed
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Optional Zoom Range Input */}
            <div className="zoom-slider">
              <label htmlFor="zoom">Zoom:</label>
              <input
                type="range"
                id="zoom"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="crop-controls">
              <p>Drag to position and use handles to resize crop area</p>
              <div className="crop-buttons">
                <button onClick={cropImage} className="primary-btn">
                  Use Image
                </button>
                <button onClick={cancelCrop} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowLoginModal(false)}
            >
              &times;
            </button>
            <h2>Login</h2>
            {formError && <div className="error-message">{formError}</div>}
            {formSuccess && <div className="success-message">{formSuccess}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Login"}
              </button>
              <p className="modal-switch">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignupModal(true);
                  }}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowSignupModal(false)}
            >
              &times;
            </button>
            <h2>Sign Up</h2>
            {formError && <div className="error-message">{formError}</div>}
            {formSuccess && <div className="success-message">{formSuccess}</div>}
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Sign Up"}
              </button>
              <p className="modal-switch">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setShowSignupModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;