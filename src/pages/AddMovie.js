import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
  });

  const navigate = useNavigate();

  // Handles changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handles movie addition logic
  const handleAddMovie = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in as an admin to add a movie.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movieDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Movie added successfully!");
        navigate("/"); // Redirect to the home page
      } else {
        const errorData = await response.json();
        alert(`Error adding movie: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="add-movie-container">
      <Container className="d-flex justify-content-center mt-5">
        <Card className="add-movie-card">
          <Card.Body>
            <h2 className="text-center mb-4">Add a New Movie</h2>
            <Form onSubmit={handleAddMovie}>
              {/* Title Field */}
              <Form.Group className="mb-3" controlId="titleInput">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={movieDetails.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Director Field */}
              <Form.Group className="mb-3" controlId="directorInput">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  placeholder="Enter director's name"
                  value={movieDetails.director}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Year Field */}
              <Form.Group className="mb-3" controlId="yearInput">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  placeholder="Enter release year"
                  value={movieDetails.year}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Description Field */}
              <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter movie description"
                  value={movieDetails.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Genre Field */}
              <Form.Group className="mb-3" controlId="genreInput">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  placeholder="Enter genre"
                  value={movieDetails.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Add Movie
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddMovie;
