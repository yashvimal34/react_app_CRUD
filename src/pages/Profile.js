import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { getUsersFromStorage, setUsersToStorage } from "../utils/storage";

export default function Profile() {
    const { currentUser, updateProfile } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: currentUser?.name || "", email: currentUser?.email || "", password: currentUser?.password || "" });
    const [message, setMessage] = useState("");

    if (!currentUser) return null; // PrivateRoute prevents this but guard anyway

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSave(e) {
        e.preventDefault();
        setMessage("");

        if (!form.name || !form.email) {
            setMessage("Name and email cannot be empty.");
            return;
        }
        // update stored users
        const users = getUsersFromStorage().map(u =>
            u.email === currentUser.email ? { ...u, name: form.name, email: form.email, password: form.password } : u
        );
        setUsersToStorage(users);
        updateProfile({ ...currentUser, name: form.name, email: form.email, password: form.password });
        setEditing(false);
        setMessage("Profile updated successfully.");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3>My Profile</h3>
                {message && <div className="alert alert-success">{message}</div>}
                {!editing && (
                    <div className="card p-3">
                        <p><strong>Name:</strong> {currentUser.name}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
                    </div>
                )}
                {editing && (
                    <form onSubmit={handleSave} className="card p-3">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" value={form.email} onChange={handleChange} className="form-control" type="email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password (leave if you don't want to change)</label>
                            <input name="password" value={form.password} onChange={handleChange} className="form-control" type="password" />
                        </div>
                        <button className="btn btn-success me-2" type="submit">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => { setEditing(false); setForm({ name: currentUser.name, email: currentUser.email, password: currentUser.password }); setMessage(""); }}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
}
