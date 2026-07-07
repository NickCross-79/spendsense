import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import BudgetCard from '../budget-card/BudgetCard.jsx';
import SideMenu from '../side-menu/SideMenu.jsx';
import EmptyBudgets from './EmptyBudgets.jsx';
import './overview.css';

const Overview = () => {
    const { user } = useAuth();
    const [budgets, setBudgets] = useState(null);
    const [error, setError] = useState(null);

    const loadBudgets = useCallback(async () => {
        try {
            const response = await api.get('/user/budgets');
            setBudgets(response.data);
            setError(null);
        } catch (err) {
            setError('Could not load your budgets — please try again.');
        }
    }, []);

    useEffect(() => {
        loadBudgets();
    }, [loadBudgets]);

    return (
        <div className="overview">
            <section className="overview_main">
                <div className="hero">
                    <div className="hero_text">
                        <h1>Welcome back, {user?.firstName}</h1>
                        <p>Here&apos;s how your money is doing today.</p>
                    </div>
                    <Link className="btn btn-on-gradient" to="/create-budget">+ New budget</Link>
                </div>

                {error && (
                    <div className="card overview_state">
                        <p className="form-error">{error}</p>
                        <button type="button" className="btn btn-secondary" onClick={loadBudgets}>Retry</button>
                    </div>
                )}

                {!error && budgets === null && (
                    <div className="budget-dash" role="status" aria-label="Loading budgets">
                        <div className="stat-tiles">
                            {[0, 1, 2, 3].map(i => <div key={i} className="skeleton stat-tile_skeleton" />)}
                        </div>
                        <div className="skeleton budget-card_skeleton" />
                    </div>
                )}

                {!error && budgets !== null && budgets.length === 0 && (
                    <div className="card overview_state">
                        <EmptyBudgets />
                        <h2>No budgets yet</h2>
                        <p>Create your first budget to start tracking where every dollar goes.</p>
                        <Link className="btn btn-primary" to="/create-budget">Create a budget</Link>
                    </div>
                )}

                {!error && budgets !== null && budgets.length > 0 && (
                    <BudgetCard budgets={budgets} onChanged={loadBudgets} />
                )}
            </section>

            <SideMenu budgets={budgets ?? []} onImported={loadBudgets} />
        </div>
    );
};

export default Overview;
