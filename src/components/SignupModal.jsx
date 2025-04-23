import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
// import "../styles/AuthModals.css";

function SignupModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    // Reset error
    setError(null);

    // Full name validation
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }

    // Email validation
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Example API call
      const response = await fetch("https://api.example.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! You can now login.");
        setTimeout(() => {
          onHide();
          // You could automatically open the login modal here
        }, 2000);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      // For demo purposes, simulate success
      // Comment this and uncomment the error section for real API integration
      setSuccess("Demo: Account created successfully! You can now login.");
      setTimeout(() => {
        onHide();
      }, 2000);
      
      // Uncomment for real implementation:
      // setError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="auth-modal"
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Your InstaFinder Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <Form.Text className="text-muted">
                  Must be at least 8 characters long
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="agreeTerms"
              label="I agree to the Terms of Service and Privacy Policy"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={isLoading}
              id="terms-checkbox"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 signup-button"
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
                <span className="ms-2">Creating account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="mb-0">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 login-link"
              onClick={() => {
                onHide();
                // Open login modal logic would go here
                // This would be handled in the parent component
              }}
            >
              Login
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignupModal;