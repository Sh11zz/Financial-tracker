const API_URL = "/api";

export async function apiFetch(path, options = {}) {

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok && !data.error) {
        data.error = "Server error";
    }

    return data;
}
