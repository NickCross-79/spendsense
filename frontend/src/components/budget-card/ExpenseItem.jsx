import { categoryLabel, formatMoney } from '../../constants.js';
import { categoryColor } from '../../theme/chartColors.js';

const ExpenseItem = ({ expense }) => {
    const label = categoryLabel(expense.expenseType);

    return (
        <li className="expense-item">
            <span
                className="category-badge"
                style={{ '--badge-color': categoryColor(expense.expenseType) }}
                aria-hidden="true"
            >
                {label.charAt(0)}
            </span>
            <div className="expense-item_text">
                <span className="expense-item_name">{expense.expenseName}</span>
                <span className="expense-item_type">{label}</span>
            </div>
            <span className="expense-item_amount">{formatMoney(expense.expenseAmount)}</span>
        </li>
    );
};

export default ExpenseItem;
