import { apiFetch } from "../../api.js";

export async function registerUser(userData) {

    try {

        return await apiFetch("/register", {
            method: "POST",
            body: JSON.stringify(userData)
        });

    } catch {

        return {
            error: "Server error"
        };
    }
}


export async function loginUser(
    username,
    password
) {

    try {

        return await apiFetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });

    } catch {

        return {
            error: "Server error"
        };
    }
}


export function logoutUser(navigate) {

    localStorage.removeItem("user_id");
    localStorage.removeItem("username");

    navigate("/");
}


export function isAuthenticated() {

    return !!localStorage.getItem("user_id");
}
