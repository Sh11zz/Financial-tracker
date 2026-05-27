export const loginUser = (username, password) => {
    const savedUser = JSON.parse(localStorage.getItem('user'))

    if (savedUser && 
        username === savedUser.username &&
        password === savedUser.password
    ) 
    {
            const fakeToken = {
                token: 'fake-jwt-token',
                username: username,
                exp: Date.now() + 1000 * 60 * 60
            }
            localStorage.setItem('token', JSON.stringify(fakeToken))
        return fakeToken
    } 
    return null
}

export const registerUser = ({ username, email, password }) => {
    const user = {
        username,
        email,
        password
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user
}

export const logoutUser = (navigate) => {
    localStorage.removeItem("token");
    navigate("/");
}

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    return Date.now() < token.exp;
};