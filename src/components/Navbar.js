import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Navbar() {
    const { currentUser, logout } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">AccountApp</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {!currentUser && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            </>
                        )}
                        {currentUser && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                                <li className="nav-item"><button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
