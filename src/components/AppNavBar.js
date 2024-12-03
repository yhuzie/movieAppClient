import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const AppNavBar = () => {
  const { user, logout } = useContext(UserContext); // Access user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user and token data
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#141414" }}>
      <Container>
        {/* Netflix-style Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#E50914",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textTransform: "uppercase",
          }}
        >
          MovieApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: "#FFFFFF",
                fontSize: "1rem",
                marginRight: "1rem",
                textTransform: "uppercase",
              }}
            >
              Home
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/add-movie"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    marginRight: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Add Movie
                </Nav.Link>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={handleLogout}
                  style={{
                    color: "#E50914",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    marginRight: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    marginRight: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
