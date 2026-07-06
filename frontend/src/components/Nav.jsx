import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';
import './nav.css';

function Nav() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="nav">
            <Logo />
            <nav className="nav_links" aria-label="Main navigation">
                <NavLink to="/overview">Overview</NavLink>
                <NavLink to="/create-budget">Create Budget</NavLink>
            </nav>
            <div className="nav_user">
                <span className="nav_user-name">{user?.firstName} {user?.lastName}</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
}

export default Nav;
