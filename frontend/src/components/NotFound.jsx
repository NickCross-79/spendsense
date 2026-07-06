import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="page not-found">
            <h1>404</h1>
            <p>This page doesn&apos;t exist.</p>
            <Link className="btn btn-primary" to="/overview">Back to overview</Link>
        </main>
    );
};

export default NotFound;
