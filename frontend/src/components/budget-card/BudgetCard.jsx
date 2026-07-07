import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import { formatMoney } from '../../constants.js';
import StatTiles from './StatTiles.jsx';
import BudgetGraph from './BudgetGraph.jsx';
import TopExpenses from './TopExpenses.jsx';
import CategoryBars from './CategoryBars.jsx';
import UpcomingPayments from './UpcomingPayments.jsx';
import './budget-card.css';

// Whole days from today until the budget's end date; negative = ended
function daysUntil(dateString) {
    if (!dateString) return null;
    const end = new Date(`${dateString}T23:59:59`);
    if (Number.isNaN(end.getTime())) return null;
    return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

const BudgetCard = ({ budgets, onChanged }) => {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const safeIndex = Math.min(index, budgets.length - 1);
    const budgetId = budgets[safeIndex]._id;

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setConfirmingDelete(false);

        async function load() {
            const [statsResponse, budgetResponse] = await Promise.all([
                api.get(`/budget/${budgetId}/stats`),
                api.get(`/budget/${budgetId}`),
            ]);
            const stats = statsResponse.data;
            const [expenses, incomes] = await Promise.all([
                Promise.all(stats.expenseList.map(id => api.get(`/expense/${id}`).then(r => r.data))),
                Promise.all(stats.incomeList.map(id => api.get(`/income/${id}`).then(r => r.data))),
            ]);
            if (cancelled) return;
            setData({ stats, budget: budgetResponse.data, expenses, incomes });
            setLoading(false);
        }
        load().catch(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [budgetId]);

    const handleDelete = async () => {
        await api.delete(`/budget/${budgetId}`);
        setIndex(0);
        onChanged();
    };

    const spent = data ? data.expenses.reduce((sum, e) => sum + (e.expenseAmount || 0), 0) : 0;
    const incomeTotal = data?.stats.incomeTotal ?? 0;
    const daysLeft = data ? daysUntil(data.budget?.endDate) : null;

    if (loading || !data) {
        return (
            <div className="budget-dash" role="status" aria-label="Loading budget">
                <div className="stat-tiles">
                    {[0, 1, 2, 3].map(i => <div key={i} className="skeleton stat-tile_skeleton" />)}
                </div>
                <div className="skeleton budget-card_skeleton" />
            </div>
        );
    }

    return (
        <div className="budget-dash">
            <StatTiles
                incomeTotal={incomeTotal}
                spent={spent}
                leftOver={incomeTotal - spent}
                daysLeft={daysLeft}
            />

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

                <article className="card budget-card lift">
                    <header className="budget-card_header">
                        <div>
                            <h2 className="budget-card_name">{data.stats.budgetName}</h2>
                            {data.budget && (
                                <p className="budget-card_dates">{data.budget.startDate} → {data.budget.endDate}</p>
                            )}
                        </div>
                        <div className="budget-card_total">
                            <span>Total income</span>
                            <strong>{formatMoney(incomeTotal)}</strong>
                        </div>
                    </header>
                    <div className="budget-card_body">
                        <BudgetGraph
                            data={data.stats.expensePercentagesByType}
                            spent={spent}
                            incomeTotal={incomeTotal}
                        />
                        <TopExpenses expenses={data.expenses} />
                    </div>
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

            <div className="budget-panels">
                <CategoryBars expenses={data.expenses} />
                <UpcomingPayments incomes={data.incomes} />
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
