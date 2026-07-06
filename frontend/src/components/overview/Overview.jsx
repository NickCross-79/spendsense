import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import BudgetCard from '../budget-card/BudgetCard.jsx';
import SideMenu from '../side-menu/SideMenu.jsx';
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
                <h1 className="overview_header">
                    Welcome back, <span className="accent">{user?.firstName}</span>
                </h1>

                {error && (
                    <div className="card overview_state">
                        <p className="form-error">{error}</p>
                        <button type="button" className="btn btn-secondary" onClick={loadBudgets}>Retry</button>
                    </div>
                )}

                {!error && budgets === null && (
                    <div className="card overview_state" role="status" aria-label="Loading budgets">
                        <div className="spinner" />
                        <p>Loading your budgets…</p>
                    </div>
                )}

                {!error && budgets !== null && budgets.length === 0 && (
                    <div className="card overview_state">
                        <h2>No budgets yet</h2>
                        <p>Create your first budget to start tracking your spending.</p>
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
