import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import BrandPanel from './BrandPanel.jsx';
import AuthForm from './AuthForm.jsx';
import './login.css';

const LoginPage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="page-loading" role="status" aria-label="Loading">
                <div className="spinner" />
            </div>
        );
    }
    if (user) return <Navigate to="/overview" replace />;

    return (
        <main className="login-page">
            <BrandPanel />
            <AuthForm />
        </main>
    );
};

export default LoginPage;
