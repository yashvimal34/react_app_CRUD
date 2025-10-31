import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { getUsersFromStorage } from "../utils/storage";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        const users = getUsersFromStorage();
        const found = users.find(u => u.email === email && u.password === password);
        if (!found) {
            setError("Invalid email or password.");
            return;
        }
        login(found);
        navigate("/profile");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <h3>Login</h3>
                <form onSubmit={handleSubmit} className="mt-3">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                    <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    );
}
