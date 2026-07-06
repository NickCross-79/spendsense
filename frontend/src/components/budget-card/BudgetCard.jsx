import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import { formatMoney } from '../../constants.js';
import BudgetGraph from './BudgetGraph.jsx';
import TopExpenses from './TopExpenses.jsx';
import './budget-card.css';

const BudgetCard = ({ budgets, onChanged }) => {
    const [index, setIndex] = useState(0);
    const [stats, setStats] = useState(null);
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const safeIndex = Math.min(index, budgets.length - 1);
    const budgetId = budgets[safeIndex]._id;

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setConfirmingDelete(false);
        Promise.all([
            api.get(`/budget/${budgetId}/stats`),
            api.get(`/budget/${budgetId}`),
        ]).then(([statsResponse, budgetResponse]) => {
            if (cancelled) return;
            setStats(statsResponse.data);
            setBudget(budgetResponse.data);
            setLoading(false);
        }).catch(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [budgetId]);

    const handleDelete = async () => {
        await api.delete(`/budget/${budgetId}`);
        setIndex(0);
        onChanged();
    };

    return (
        <div className="budget-carousel">
            <div className="budget-carousel_row">
                <button
                    type="button"
                    className="carousel-arrow"
                    aria-label="Previous budget"
                    disabled={safeIndex === 0}
                    onClick={() => setIndex(i => Math.max(i - 1, 0))}
                >
                    ‹
                </button>

                <article className="card budget-card" aria-busy={loading}>
                    {loading && (
                        <div className="budget-card_loading" role="status" aria-label="Loading budget">
                            <div className="spinner" />
                        </div>
                    )}
                    {!loading && stats && (
                        <>
                            <header className="budget-card_header">
                                <div>
                                    <h2 className="budget-card_name">{stats.budgetName}</h2>
                                    {budget && (
                                        <p className="budget-card_dates">{budget.startDate} → {budget.endDate}</p>
                                    )}
                                </div>
                                <div className="budget-card_total">
                                    <span>Total income</span>
                                    <strong>{formatMoney(stats.incomeTotal)}</strong>
                                </div>
                            </header>
                            <div className="budget-card_body">
                                <BudgetGraph data={stats.expensePercentagesByType} />
                                <TopExpenses expenseList={stats.expenseList} />
                            </div>
                        </>
                    )}
                </article>

                <button
                    type="button"
                    className="carousel-arrow"
                    aria-label="Next budget"
                    disabled={safeIndex >= budgets.length - 1}
                    onClick={() => setIndex(i => Math.min(i + 1, budgets.length - 1))}
                >
                    ›
                </button>
            </div>

            <div className="budget-carousel_footer">
                <div className="carousel-dots" role="tablist" aria-label="Budgets">
                    {budgets.map((b, i) => (
                        <button
                            key={b._id}
                            type="button"
                            role="tab"
                            aria-selected={i === safeIndex}
                            aria-label={`Budget ${i + 1} of ${budgets.length}`}
                            className={`carousel-dot ${i === safeIndex ? 'is-active' : ''}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

                {!confirmingDelete ? (
                    <button type="button" className="btn btn-danger-ghost btn-sm" onClick={() => setConfirmingDelete(true)}>
                        Delete budget
                    </button>
                ) : (
                    <div className="budget-card_confirm">
                        <span>Delete this budget?</span>
                        <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>Yes, delete</button>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmingDelete(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetCard;
