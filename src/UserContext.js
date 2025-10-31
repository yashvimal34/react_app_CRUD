import React, { createContext, useState, useEffect } from "react";
import { getUsersFromStorage, setUsersToStorage } from "./utils/storage";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    // On mount, check if a session is saved
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("sessionUser") || "null");
        if (saved) setCurrentUser(saved);
    }, []);

    // login: set session user
    function login(user) {
        localStorage.setItem("sessionUser", JSON.stringify(user));
        setCurrentUser(user);
    }

    // logout: clear session user
    function logout() {
        localStorage.removeItem("sessionUser");
        setCurrentUser(null);
    }

    // register: add user to storage
    function register(user) {
        const users = getUsersFromStorage();
        users.push(user);
        setUsersToStorage(users);
        // auto-login after register
        login(user);
    }

    // updateProfile: update stored user and session
    function updateProfile(updated) {
        const users = getUsersFromStorage().map(u =>
            u.email === updated.email ? updated : u
        );
        setUsersToStorage(users);
        login(updated);
    }

    return (
        <UserContext.Provider value={{ currentUser, login, logout, register, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
}
