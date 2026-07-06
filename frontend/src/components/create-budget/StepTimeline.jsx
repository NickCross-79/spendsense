import { useState } from 'react';

const StepTimeline = ({ draft, updateDraft, next, back }) => {
    const [error, setError] = useState(null);

    const handleNext = (e) => {
        e.preventDefault();
        if (!draft.startDate || !draft.endDate) {
            setError('Choose both a start and an end date');
            return;
        }
        if (draft.endDate < draft.startDate) {
            setError('The end date must be after the start date');
            return;
        }
        next();
    };

    return (
        <form className="wizard_step card" onSubmit={handleNext}>
            <h1 className="wizard_heading">What is the <span className="accent">timeline</span>?</h1>
            <div className="field-row">
                <div className="field">
                    <label htmlFor="startDate">Start date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={draft.startDate}
                        onChange={e => { updateDraft({ startDate: e.target.value }); setError(null); }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="endDate">End date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={draft.endDate}
                        onChange={e => { updateDraft({ endDate: e.target.value }); setError(null); }}
                    />
                </div>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="wizard_actions">
                <button type="button" className="btn btn-ghost" onClick={back}>Back</button>
                <button type="submit" className="btn btn-primary">Next</button>
            </div>
        </form>
    );
};

export default StepTimeline;
