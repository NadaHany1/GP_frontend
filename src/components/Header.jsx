import "../styles/Header.css";

function Header({ title, className }) {
    return (
        <h2 className={`section-header ${className || ''}`}>
            {title}
        </h2>
    );
}

export default Header;
