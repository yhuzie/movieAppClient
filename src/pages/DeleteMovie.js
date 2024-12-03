import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Alert } from "react-bootstrap";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies || []);
      } else {
        throw new Error("Failed to fetch movies");
      }
    } catch (error) {
      setError("Error fetching movies. Please try again later.");
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        setSuccess("Movie deleted successfully!");
        fetchMovies(); // Refresh the movie list
      } else {
        throw new Error("Failed to delete movie");
      }
    } catch (error) {
      setError("Error deleting movie. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="title">Movie List</h1>

      {/* Show success or error messages */}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Table responsive striped bordered hover className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>
                <Button
                  variant="danger"
                  className="delete-btn"
                  onClick={() => deleteMovie(movie._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MovieList;
