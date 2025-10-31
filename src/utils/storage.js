export function getUsersFromStorage() {
    const raw = localStorage.getItem("users");
    try {
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function setUsersToStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
