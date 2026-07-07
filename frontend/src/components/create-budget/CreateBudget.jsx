import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client.js';
import StepIndicator from './StepIndicator.jsx';
import StepName from './StepName.jsx';
import StepTimeline from './StepTimeline.jsx';
import StepExpenses from './StepExpenses.jsx';
import StepIncomes from './StepIncomes.jsx';
import StepReview from './StepReview.jsx';
import DraftSummary from './DraftSummary.jsx';
import './create-budget.css';

const DRAFT_KEY = 'spendsense-budget-draft';

const emptyDraft = {
    budgetName: '',
    startDate: '',
    endDate: '',
    expenses: [],
    incomes: [],
};

function loadDraft() {
    try {
        const stored = sessionStorage.getItem(DRAFT_KEY);
        return stored ? { ...emptyDraft, ...JSON.parse(stored) } : emptyDraft;
    } catch {
        return emptyDraft;
    }
}

export const STEPS = ['Name', 'Timeline', 'Expenses', 'Incomes', 'Review'];

const CreateBudget = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [draft, setDraft] = useState(loadDraft);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, [draft]);

    const updateDraft = (changes) => setDraft(current => ({ ...current, ...changes }));
    const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const back = () => setStep(s => Math.max(s - 1, 0));

    const createBudget = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const expenseIds = await Promise.all(
                draft.expenses.map(async expense => (await api.post('/expense/newExpense', expense)).data)
            );
            const incomeIds = await Promise.all(
                draft.incomes.map(async income => (await api.post('/income/newIncome', income)).data)
            );
            await api.post('/budget/newBudget', {
                budgetName: draft.budgetName,
                startDate: draft.startDate,
                endDate: draft.endDate,
                expenses: expenseIds,
                incomes: incomeIds,
            });
            sessionStorage.removeItem(DRAFT_KEY);
            navigate('/overview');
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Failed to create the budget — please try again.');
            setSubmitting(false);
        }
    };

    const stepProps = { draft, updateDraft, next, back };

    return (
        <div className="wizard">
            <StepIndicator steps={STEPS} current={step} />
            <div className="wizard_layout">
                <div className="wizard_content">
                    {step === 0 && <StepName {...stepProps} />}
                    {step === 1 && <StepTimeline {...stepProps} />}
                    {step === 2 && <StepExpenses {...stepProps} />}
                    {step === 3 && <StepIncomes {...stepProps} />}
                    {step === 4 && (
                        <StepReview
                            draft={draft}
                            back={back}
                            submitting={submitting}
                            error={error}
                            createBudget={createBudget}
                        />
                    )}
                </div>
                {step < 4 && <DraftSummary draft={draft} />}
            </div>
        </div>
    );
};

export default CreateBudget;
