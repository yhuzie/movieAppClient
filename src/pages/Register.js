import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="register-card">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="passwordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Create Account
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
