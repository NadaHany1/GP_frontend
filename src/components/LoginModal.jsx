import { useState } from "react";
import "../styles/login.css";
import authService from "../services/authService";

function LoginModal({ setShowLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!email || !password) {
      setFormError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    const result = await authService.login(email, password);

    if (result.success) {
      setFormSuccess("Login successful!");
      setTimeout(() => {
        setShowLoginModal(false); // Close modal after success
      }, 1500);
    } else {
      setFormError(result.error);
    }

    setIsLoading(false);
  };

  return (
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
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
