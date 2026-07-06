import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Nav from './Nav.jsx';

// Wraps every authenticated page: waits for the auth probe, bounces
// logged-out visitors to /login, and renders the shared nav.
const ProtectedLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="page-loading" role="status" aria-label="Loading">
                <div className="spinner" />
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <Nav />
            <main className="page">
                <Outlet />
            </main>
        </>
    );
};

export default ProtectedLayout;
