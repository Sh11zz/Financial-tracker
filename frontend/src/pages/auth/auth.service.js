export async function registerUser(userData) {

    try {

        const response = await fetch(
            "http://localhost:8000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

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

        const response = await fetch(
            "http://localhost:8000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

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


export function getCurrentUser() {

    return {
        user_id: localStorage.getItem("user_id"),
        username: localStorage.getItem("username")
    };
}


export function isAuthenticated() {

    const userId =
        localStorage.getItem("user_id");

    return !!userId;
}