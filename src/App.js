import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import AppNavBar from "./components/AppNavBar";
import { UserProvider } from "./UserContext";
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
