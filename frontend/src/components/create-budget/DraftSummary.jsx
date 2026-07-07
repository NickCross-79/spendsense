import { formatMoney } from '../../constants.js';

// Live "your budget so far" rail beside the wizard steps
const DraftSummary = ({ draft }) => {
    const expenseTotal = draft.expenses.reduce((sum, e) => sum + (Number(e.expenseAmount) || 0), 0);
    const incomeTotal = draft.incomes.reduce((sum, i) => sum + (Number(i.incomeAmount) || 0), 0);

    const rows = [
        { label: 'Name', done: !!draft.budgetName.trim(), detail: draft.budgetName.trim() || 'Not set yet' },
        { label: 'Timeline', done: !!(draft.startDate && draft.endDate), detail: draft.startDate && draft.endDate ? `${draft.startDate} → ${draft.endDate}` : 'Not set yet' },
        { label: 'Expenses', done: draft.expenses.length > 0, detail: draft.expenses.length > 0 ? `${draft.expenses.length} added · ${formatMoney(expenseTotal)}` : 'None yet' },
        { label: 'Incomes', done: draft.incomes.length > 0, detail: draft.incomes.length > 0 ? `${draft.incomes.length} added · ${formatMoney(incomeTotal)}` : 'None yet' },
    ];

    return (
        <aside className="draft-summary card" aria-label="Your budget so far">
            <h2 className="draft-summary_title">Your budget so far</h2>
            <ul>
                {rows.map(row => (
                    <li key={row.label} className={`draft-summary_row ${row.done ? 'is-done' : ''}`}>
                        <span className="draft-summary_check" aria-hidden="true">{row.done ? '✓' : '·'}</span>
                        <div>
                            <span className="draft-summary_label">{row.label}</span>
                            <span className="draft-summary_detail">{row.detail}</span>
                        </div>
                    </li>
                ))}
            </ul>
            {incomeTotal > 0 && (
                <p className="draft-summary_leftover">
                    <span>Left over</span>
                    <strong className={incomeTotal - expenseTotal < 0 ? 'is-negative' : 'is-positive'}>
                        {formatMoney(incomeTotal - expenseTotal)}
                    </strong>
                </p>
            )}
        </aside>
    );
};

export default DraftSummary;
