import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import UserContext from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access) {
          localStorage.setItem("token", data.access);
          login(data.user || {}, data.access);
          alert("Login successful!");
          navigate("/"); // Redirect to home page
        } else {
          alert("Login failed. No token received.");
        }
      } else {
        const error = await response.json();
        alert(error.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="login-card">
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </Form.Group>
              <Button variant="danger" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
