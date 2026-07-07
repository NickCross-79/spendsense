// Friendly doughnut-and-coin sketch for the first-run empty state
const EmptyBudgets = () => (
    <svg
        className="empty-illustration"
        viewBox="0 0 160 120"
        role="img"
        aria-label="Illustration of a budget chart waiting for data"
    >
        <circle cx="70" cy="60" r="38" fill="none" stroke="#ece2ff" strokeWidth="14" />
        <path
            d="M 70 22 A 38 38 0 0 1 105 45"
            fill="none"
            stroke="#8a4fff"
            strokeWidth="14"
            strokeLinecap="round"
        />
        <path
            d="M 106 48 A 38 38 0 0 1 104 78"
            fill="none"
            stroke="#d0b9ff"
            strokeWidth="14"
            strokeLinecap="round"
        />
        <circle cx="128" cy="84" r="16" fill="#f6f1ff" stroke="#d0b9ff" strokeWidth="2" />
        <text x="128" y="90" textAnchor="middle" fontSize="16" fontWeight="700" fill="#8a4fff">$</text>
        <circle cx="140" cy="38" r="9" fill="#f6f1ff" stroke="#d0b9ff" strokeWidth="2" />
        <text x="140" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill="#8a4fff">$</text>
    </svg>
);

export default EmptyBudgets;
