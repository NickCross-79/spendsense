import { useState } from 'react';
import { INCOME_CATEGORIES, INCOME_FREQUENCIES } from '../../constants.js';
import ItemList from './ItemList.jsx';

const emptyIncome = { incomeName: '', incomeType: '', incomeAmount: '', incomeFrequency: '', paymentDate: '' };

const StepIncomes = ({ draft, updateDraft, next, back }) => {
    const [income, setIncome] = useState(emptyIncome);
    const [error, setError] = useState(null);

    const setField = (changes) => {
        setIncome(current => ({ ...current, ...changes }));
        setError(null);
    };

    const handleAdd = () => {
        if (!income.incomeName.trim() || !income.incomeType || !income.incomeAmount
            || !income.incomeFrequency || !income.paymentDate) {
            setError('Fill in all the fields to add an income');
            return;
        }
        updateDraft({
            incomes: [...draft.incomes, { ...income, incomeAmount: Number(income.incomeAmount) }],
        });
        setIncome(emptyIncome);
    };

    const handleRemove = (index) => {
        updateDraft({ incomes: draft.incomes.filter((_, i) => i !== index) });
    };

    return (
        <div className="wizard_step card">
            <h1 className="wizard_heading">What are your <span className="accent">incomes</span>?</h1>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="incomeName">Income name</label>
                    <input
                        id="incomeName"
                        type="text"
                        placeholder="e.g. Salary"
                        value={income.incomeName}
                        onChange={e => setField({ incomeName: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label htmlFor="incomeType">Category</label>
                    <select
                        id="incomeType"
                        value={income.incomeType}
                        onChange={e => setField({ incomeType: e.target.value })}
                    >
                        <option value="">Choose a category</option>
                        {INCOME_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="incomeAmount">Amount</label>
                    <div className="field_money">
                        <span aria-hidden="true">$</span>
                        <input
                            id="incomeAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={income.incomeAmount}
                            onChange={e => setField({ incomeAmount: e.target.value })}
                        />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="incomeFrequency">Frequency</label>
                    <select
                        id="incomeFrequency"
                        value={income.incomeFrequency}
                        onChange={e => setField({ incomeFrequency: e.target.value })}
                    >
                        <option value="">How often?</option>
                        {INCOME_FREQUENCIES.map(freq => (
                            <option key={freq.value} value={freq.value}>{freq.label}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="paymentDate">Next payment</label>
                    <input
                        id="paymentDate"
                        type="date"
                        value={income.paymentDate}
                        onChange={e => setField({ paymentDate: e.target.value })}
                    />
                </div>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="button" className="btn-add" onClick={handleAdd}>+ Add income</button>

            <ItemList
                items={draft.incomes}
                nameKey="incomeName"
                amountKey="incomeAmount"
                typeKey="incomeType"
                onRemove={handleRemove}
                emptyText="No incomes added yet — add at least one so your budget has something to work with."
            />

            <div className="wizard_actions">
                <button type="button" className="btn btn-ghost" onClick={back}>Back</button>
                <button type="button" className="btn btn-primary" onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default StepIncomes;
