import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovie/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDirector(data.director);
        setYear(data.year);
        setDescription(data.description);
        setGenre(data.genre);
      })
      .catch((error) => {
        setError("Error fetching movie details.");
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/updateMovie/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, director, year, description, genre }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess("Movie updated successfully!");
          navigate("/");
        } else {
          setError("Failed to update movie.");
        }
      })
      .catch((error) => {
        setError("Error updating movie.");
        console.error("Error updating movie:", error);
      });
  };

  const handleDeleteMovie = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setSuccess("Movie deleted successfully!");
            navigate("/");
          } else {
            setError("Failed to delete movie.");
          }
        })
        .catch((error) => {
          setError("Error deleting movie.");
          console.error("Error deleting movie:", error);
        });
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="title">Edit Movie</h1>

      {/* Show success or error messages */}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Form onSubmit={handleUpdateMovie} className="movie-form">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter director name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter movie release year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter movie description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter movie genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-btn">
          Update Movie
        </Button>
      </Form>

      <Button
        variant="danger"
        onClick={handleDeleteMovie}
        className="delete-btn mt-3"
      >
        Delete Movie
      </Button>
    </Container>
  );
};

export default EditMovie;
