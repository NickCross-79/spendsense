import { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../../constants.js';
import ItemList from './ItemList.jsx';

const emptyExpense = { expenseName: '', expenseType: '', expenseAmount: '', expenseDate: '' };

const StepExpenses = ({ draft, updateDraft, next, back }) => {
    const [expense, setExpense] = useState(emptyExpense);
    const [error, setError] = useState(null);

    const setField = (changes) => {
        setExpense(current => ({ ...current, ...changes }));
        setError(null);
    };

    const handleAdd = () => {
        if (!expense.expenseName.trim() || !expense.expenseType || !expense.expenseAmount || !expense.expenseDate) {
            setError('Fill in all the fields to add an expense');
            return;
        }
        updateDraft({
            expenses: [...draft.expenses, { ...expense, expenseAmount: Number(expense.expenseAmount) }],
        });
        setExpense(emptyExpense);
    };

    const handleRemove = (index) => {
        updateDraft({ expenses: draft.expenses.filter((_, i) => i !== index) });
    };

    return (
        <div className="wizard_step card">
            <h1 className="wizard_heading">What are your <span className="accent">expenses</span>?</h1>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="expenseName">Expense name</label>
                    <input
                        id="expenseName"
                        type="text"
                        placeholder="e.g. Rent"
                        value={expense.expenseName}
                        onChange={e => setField({ expenseName: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label htmlFor="expenseType">Category</label>
                    <select
                        id="expenseType"
                        value={expense.expenseType}
                        onChange={e => setField({ expenseType: e.target.value })}
                    >
                        <option value="">Choose a category</option>
                        {EXPENSE_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="expenseAmount">Amount</label>
                    <div className="field_money">
                        <span aria-hidden="true">$</span>
                        <input
                            id="expenseAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={expense.expenseAmount}
                            onChange={e => setField({ expenseAmount: e.target.value })}
                        />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="expenseDate">Payment date</label>
                    <input
                        id="expenseDate"
                        type="date"
                        value={expense.expenseDate}
                        onChange={e => setField({ expenseDate: e.target.value })}
                    />
                </div>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="button" className="btn-add" onClick={handleAdd}>+ Add expense</button>

            <ItemList
                items={draft.expenses}
                nameKey="expenseName"
                amountKey="expenseAmount"
                typeKey="expenseType"
                onRemove={handleRemove}
                emptyText="No expenses added yet — you can also add them later."
            />

            <div className="wizard_actions">
                <button type="button" className="btn btn-ghost" onClick={back}>Back</button>
                <button type="button" className="btn btn-primary" onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default StepExpenses;
