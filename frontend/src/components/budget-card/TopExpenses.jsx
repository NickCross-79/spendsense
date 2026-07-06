import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import ExpenseItem from './ExpenseItem.jsx';

const TopExpenses = ({ expenseList }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let cancelled = false;
        Promise.all(
            expenseList.map(id => api.get(`/expense/${id}`).then(response => response.data))
        ).then(data => {
            if (cancelled) return;
            setExpenses(data.sort((a, b) => b.expenseAmount - a.expenseAmount));
        }).catch(() => {
            if (!cancelled) setExpenses([]);
        });
        return () => { cancelled = true; };
    }, [expenseList]);

    return (
        <div className="top-expenses">
            <h3>Top expenses</h3>
            {expenses.length === 0 && <p className="top-expenses_empty">No expenses in this budget yet.</p>}
            <ul>
                {expenses.slice(0, 5).map(expense => (
                    <ExpenseItem key={expense._id} expense={expense} />
                ))}
            </ul>
        </div>
    );
};

export default TopExpenses;
