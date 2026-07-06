import { useState } from 'react';

const StepName = ({ draft, updateDraft, next }) => {
    const [error, setError] = useState(null);

    const handleNext = (e) => {
        e.preventDefault();
        if (!draft.budgetName.trim()) {
            setError('Give your budget a name to continue');
            return;
        }
        next();
    };

    return (
        <form className="wizard_step card" onSubmit={handleNext}>
            <h1 className="wizard_heading">What is the <span className="accent">name</span> of your budget?</h1>
            <div className="field">
                <label htmlFor="budgetName">Budget name</label>
                <input
                    id="budgetName"
                    type="text"
                    placeholder="e.g. March household budget"
                    value={draft.budgetName}
                    onChange={e => { updateDraft({ budgetName: e.target.value }); setError(null); }}
                />
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="wizard_actions">
                <span />
                <button type="submit" className="btn btn-primary">Next</button>
            </div>
        </form>
    );
};

export default StepName;
