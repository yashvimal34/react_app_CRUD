import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <div className="p-4">
              <h2>Welcome</h2>
              <p>This app demonstrates registration, login, and profile editing using localStorage and Bootstrap.</p>
              <p><Link to="/register" className="btn btn-primary me-2">Register</Link><Link to="/login" className="btn btn-outline-primary">Login</Link></p>
            </div>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}
