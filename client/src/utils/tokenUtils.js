// Token utility functions
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // Decode the token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        return payload.exp > currentTime;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
};

export const getStoredToken = () => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
        return token;
    }

    // Remove invalid token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
};

export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const setAuthData = (token, user) => {
    if (token) {
        localStorage.setItem('token', token);
    }
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}; 