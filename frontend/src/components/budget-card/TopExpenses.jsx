import ExpenseItem from './ExpenseItem.jsx';

const TopExpenses = ({ expenses }) => {
    const sorted = [...expenses].sort((a, b) => b.expenseAmount - a.expenseAmount);

    return (
        <div className="top-expenses">
            <h3>Top expenses</h3>
            {sorted.length === 0 && <p className="top-expenses_empty">No expenses in this budget yet.</p>}
            <ul>
                {sorted.slice(0, 5).map(expense => (
                    <ExpenseItem key={expense._id} expense={expense} />
                ))}
            </ul>
        </div>
    );
};

export default TopExpenses;
