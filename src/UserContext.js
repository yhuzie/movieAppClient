import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user data from the token (adjust as per your backend logic)
      const isAdmin = token.includes("admin"); // Adjust this condition based on your backend logic
      setUser({ token, isAdmin }); // Store token and role information
    }
  }, []);

  const login = (userData, token) => {
    const isAdmin = token.includes("admin"); // Adjust this logic
    setUser({ ...userData, token, isAdmin });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
