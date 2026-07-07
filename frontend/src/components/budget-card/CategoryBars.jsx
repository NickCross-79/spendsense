import { categoryColor } from '../../theme/chartColors.js';
import { categoryLabel, formatMoney } from '../../constants.js';

// Horizontal bar list of spending per category, colored with the same
// validated palette as the doughnut. Labels and amounts are visible text,
// so identity never rides on color alone.
const CategoryBars = ({ expenses }) => {
    const totals = {};
    expenses.forEach(expense => {
        totals[expense.expenseType] = (totals[expense.expenseType] || 0) + (expense.expenseAmount || 0);
    });
    const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const max = entries.length > 0 ? entries[0][1] : 0;

    return (
        <section className="card panel lift">
            <h3 className="panel_title">Spending by category</h3>
            {entries.length === 0 && <p className="panel_empty">Add expenses to see the breakdown.</p>}
            <ul className="category-bars">
                {entries.map(([type, amount]) => (
                    <li key={type} className="category-bars_row">
                        <span className="category-bars_label">{categoryLabel(type)}</span>
                        <span className="category-bars_track">
                            <span
                                className="category-bars_fill"
                                style={{ '--bar-color': categoryColor(type), width: `${max > 0 ? (amount / max) * 100 : 0}%` }}
                            />
                        </span>
                        <span className="category-bars_amount">{formatMoney(amount)}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CategoryBars;
