const StepIndicator = ({ steps, current }) => {
    return (
        <ol className="step-indicator">
            {steps.map((label, index) => {
                const state = index < current ? 'done' : index === current ? 'active' : 'todo';
                return (
                    <li key={label} className={`step-indicator_step is-${state}`} aria-current={index === current ? 'step' : undefined}>
                        <span className="step-indicator_dot">{index < current ? '✓' : index + 1}</span>
                        <span className="step-indicator_label">{label}</span>
                    </li>
                );
            })}
        </ol>
    );
};

export default StepIndicator;
