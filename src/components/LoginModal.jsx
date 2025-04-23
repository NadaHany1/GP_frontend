import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import "../styles/AuthModals.css";

function LoginModal({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    // Basic validation
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Example API call
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      // Simulate API response
      // In a real application, check the actual response status
      if (response.ok) {
        setSuccess("Login successful! Redirecting...");
        // Store token in localStorage or cookies
        localStorage.setItem("token", data.token);
        
        // Close the modal after a short delay
        setTimeout(() => {
          onHide();
          // Redirect or update app state here
          window.location.reload(); // Example: reload page
        }, 1500);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      // For demo, simulate successful login
      // Comment this block and uncomment the error block for real API integration
      setSuccess("Demo: Login successful! Redirecting...");
      setTimeout(() => {
        onHide();
      }, 1500);
      
      // Uncomment for real API integration:
      // setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password functionality
    alert("Forgot password feature will be implemented soon!");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="auth-modal"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Login to InstaFinder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <Button
              variant="link"
              className="forgot-password"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-100 login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="mb-0">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 signup-link"
              onClick={() => {
                onHide();
                // Open signup modal logic would go here
                // This would be handled in the parent component
              }}
            >
              Sign up
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;