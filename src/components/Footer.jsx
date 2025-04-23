import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>InstaFinder</h2>
                    <p>Smart shopping, powerful search, and free to use for everyone.</p>
                </div>
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p><FaEnvelope className="icon" /> helwan@gmail.com</p>
                    <p><FaPhone className="icon" /> 01011155600</p>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} InstaFinder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
