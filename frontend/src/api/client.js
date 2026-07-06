import axios from 'axios';

// Single API client for the whole app: cookie-based auth on every request.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    withCredentials: true,
});

// When the session expires mid-use, send the user back to the login page.
// Requests marked with `skipAuthRedirect` (e.g. the initial auth probe and
// the login form itself) handle 401s locally instead.
api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        if (status === 401 && !error.config?.skipAuthRedirect && window.location.pathname !== '/login') {
            window.location.assign('/login');
        }
        return Promise.reject(error);
    }
);

export default api;
