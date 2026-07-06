import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/user', { skipAuthRedirect: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (userEmail, userPassword) => {
        await api.post('/user/authenticate', { userEmail, userPassword }, { skipAuthRedirect: true });
        const response = await api.get('/user');
        setUser(response.data);
    };

    const register = async ({ userEmail, userPassword, firstName, lastName }) => {
        await api.post('/register', { userEmail, userPassword, firstName, lastName });
        await login(userEmail, userPassword);
    };

    const logout = async () => {
        try {
            await api.post('/user/logout');
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
