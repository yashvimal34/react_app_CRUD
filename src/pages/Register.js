import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { getUsersFromStorage } from "../utils/storage";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useContext(UserContext);
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!form.name || !form.email || !form.password) {
            setError("Please fill all required fields.");
            return;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }

        const existing = getUsersFromStorage().find(u => u.email === form.email);
        if (existing) {
            setError("Email already registered. Please login or use a different email.");
            return;
        }

        // create user object (simple, no hashing here)
        const user = { name: form.name, email: form.email, password: form.password };

        register(user); // registers and logs in
        navigate("/profile");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3>Register</h3>
                <form onSubmit={handleSubmit} className="mt-3">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="form-control" />
                    </div>
                    <button className="btn btn-primary" type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}
