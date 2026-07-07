import { formatMoney } from '../../constants.js';

const ICONS = {
    income: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
            <circle cx="12" cy="13.5" r="2.5" />
        </svg>
    ),
    spent: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v13" />
            <path d="m6 12 6 6 6-6" />
        </svg>
    ),
    leftOver: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 9a7 7 0 1 0-14 0c0 3 1.5 4.5 1.5 4.5H8l.6 3.2a2 2 0 0 0 2 1.6h2.9a2 2 0 0 0 2-1.6l.6-3.2h1.4S19 12 19 9Z" />
            <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
        </svg>
    ),
    days: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
    ),
};

const StatTiles = ({ incomeTotal, spent, leftOver, daysLeft }) => {
    const daysValue = daysLeft == null ? '—' : daysLeft < 0 ? 'Ended' : String(daysLeft);
    const daysHint = daysLeft == null ? 'no end date' : daysLeft < 0 ? `${Math.abs(daysLeft)} days ago` : 'in this budget';

    const tiles = [
        { icon: ICONS.income, label: 'Total income', value: formatMoney(incomeTotal), hint: 'this budget' },
        { icon: ICONS.spent, label: 'Spent so far', value: formatMoney(spent), hint: incomeTotal > 0 ? `${Math.round((spent / incomeTotal) * 100)}% of income` : 'no income set' },
        { icon: ICONS.leftOver, label: 'Left over', value: formatMoney(leftOver), hint: leftOver < 0 ? 'over budget' : 'still available', tone: leftOver < 0 ? 'negative' : 'positive' },
        { icon: ICONS.days, label: 'Days remaining', value: daysValue, hint: daysHint },
    ];

    return (
        <div className="stat-tiles">
            {tiles.map(tile => (
                <div key={tile.label} className="stat-tile lift">
                    <span className="stat-tile_icon">{tile.icon}</span>
                    <div className="stat-tile_text">
                        <span className="stat-tile_label">{tile.label}</span>
                        <strong className={`stat-tile_value ${tile.tone ? `is-${tile.tone}` : ''}`}>{tile.value}</strong>
                        <span className="stat-tile_hint">{tile.hint}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatTiles;
