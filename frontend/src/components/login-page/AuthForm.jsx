import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Extracts a human-readable message from an API error response
function errorMessage(err, fallback) {
    const data = err.response?.data;
    if (data?.msg) return data.msg;
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
        return data.errors[0].msg;
    }
    if (err.response?.status === 401) return 'Incorrect email or password';
    if (err.response?.status === 409) return 'That email is already registered';
    return fallback;
}

const AuthForm = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const isSignUp = mode === 'signup';

    const switchMode = () => {
        setMode(isSignUp ? 'login' : 'signup');
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (isSignUp) {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (password.length < 8) {
                setError('Password must be at least 8 characters');
                return;
            }
        }

        setSubmitting(true);
        try {
            if (isSignUp) {
                await register({ userEmail: email, userPassword: password, firstName, lastName });
            } else {
                await login(email, password);
            }
            navigate('/overview');
        } catch (err) {
            setError(errorMessage(err, isSignUp ? 'Sign up failed — please try again' : 'Login failed — please try again'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="login-form_container">
            <form className="login-form card" onSubmit={handleSubmit}>
                <h1>{isSignUp ? 'Create account' : 'Welcome back'}</h1>
                <p className="login-form_subtitle">
                    {isSignUp ? 'Start budgeting with SpendSense' : 'Log in to your SpendSense account'}
                </p>

                {isSignUp && (
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="firstName">First name</label>
                            <input
                                id="firstName"
                                type="text"
                                required
                                autoComplete="given-name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                id="lastName"
                                type="text"
                                required
                                autoComplete="family-name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        minLength={isSignUp ? 8 : undefined}
                        autoComplete={isSignUp ? 'new-password' : 'current-password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {isSignUp && (
                    <div className="field">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}

                {error && <p className="form-error" role="alert">{error}</p>}

                <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Please wait…' : (isSignUp ? 'Sign up' : 'Log in')}
                </button>

                <p className="login-form_switch">
                    {isSignUp ? 'Already have an account?' : 'New to SpendSense?'}{' '}
                    <button type="button" className="link-button" onClick={switchMode}>
                        {isSignUp ? 'Log in' : 'Create an account'}
                    </button>
                </p>
            </form>
        </section>
    );
};

export default AuthForm;
