import { categoryLabel, formatMoney } from '../../constants.js';

const StepReview = ({ draft, back, submitting, error, createBudget }) => {
    const incomeTotal = draft.incomes.reduce((sum, income) => sum + (Number(income.incomeAmount) || 0), 0);
    const expenseTotal = draft.expenses.reduce((sum, expense) => sum + (Number(expense.expenseAmount) || 0), 0);
    const remaining = incomeTotal - expenseTotal;

    return (
        <div className="wizard_step card">
            <h1 className="wizard_heading"><span className="accent">Review</span> your budget</h1>

            <dl className="review_summary">
                <div>
                    <dt>Name</dt>
                    <dd>{draft.budgetName}</dd>
                </div>
                <div>
                    <dt>Timeline</dt>
                    <dd>{draft.startDate} → {draft.endDate}</dd>
                </div>
                <div>
                    <dt>Total income</dt>
                    <dd>{formatMoney(incomeTotal)}</dd>
                </div>
                <div>
                    <dt>Total expenses</dt>
                    <dd>{formatMoney(expenseTotal)}</dd>
                </div>
                <div>
                    <dt>Left over</dt>
                    <dd className={remaining < 0 ? 'is-negative' : 'is-positive'}>{formatMoney(remaining)}</dd>
                </div>
            </dl>

            <div className="review_columns">
                <section>
                    <h2>Expenses ({draft.expenses.length})</h2>
                    {draft.expenses.length === 0 && <p className="item-list_empty">None added</p>}
                    <ul className="review_list">
                        {draft.expenses.map((expense, index) => (
                            <li key={index}>
                                <span>{expense.expenseName}</span>
                                <span className="review_list_type">{categoryLabel(expense.expenseType)}</span>
                                <span>{formatMoney(expense.expenseAmount)}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Incomes ({draft.incomes.length})</h2>
                    {draft.incomes.length === 0 && <p className="item-list_empty">None added</p>}
                    <ul className="review_list">
                        {draft.incomes.map((income, index) => (
                            <li key={index}>
                                <span>{income.incomeName}</span>
                                <span className="review_list_type">{categoryLabel(income.incomeType)}</span>
                                <span>{formatMoney(income.incomeAmount)}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="wizard_actions">
                <button type="button" className="btn btn-ghost" onClick={back} disabled={submitting}>Back</button>
                <button type="button" className="btn btn-primary" onClick={createBudget} disabled={submitting}>
                    {submitting ? 'Creating…' : 'Create budget'}
                </button>
            </div>
        </div>
    );
};

export default StepReview;
