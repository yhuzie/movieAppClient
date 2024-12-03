import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const fetchMovies = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/movies/getMovies?page=${page}`
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies || []);
        setHasMore(data.hasNextPage || false);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const viewMovieDetails = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleNextPage = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Movies</h1>
      <Container>
        <Row>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Col key={movie._id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="movie-card">
                  <div
                    className="movie-card-image"
                    style={{
                      backgroundImage: `url(${movie.image || "https://via.placeholder.com/300"})`,
                    }}
                  ></div>
                  <Card.Body className="movie-card-body">
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                    <Card.Text className="movie-details">
                      <strong>Genre:</strong> {movie.genre} <br />
                      <strong>Year:</strong> {movie.year}
                    </Card.Text>
                    <Button
                      className="movie-details-btn"
                      onClick={() => viewMovieDetails(movie._id)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-movies-text">No movies available. Try adding some!</p>
          )}
        </Row>
        <div className="pagination-controls">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="pagination-btn"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            disabled={!hasMore}
            onClick={handleNextPage}
            className="pagination-btn"
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
