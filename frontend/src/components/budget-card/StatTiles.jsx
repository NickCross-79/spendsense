import { formatMoney } from '../../constants.js';

const StatTiles = ({ incomeTotal, spent, leftOver, daysLeft }) => {
    const daysValue = daysLeft == null ? '—' : daysLeft < 0 ? 'Ended' : String(daysLeft);
    const daysHint = daysLeft == null ? 'no end date' : daysLeft < 0 ? `${Math.abs(daysLeft)} days ago` : 'in this budget';

    const tiles = [
        { label: 'Total income', value: formatMoney(incomeTotal), hint: 'this budget' },
        { label: 'Spent so far', value: formatMoney(spent), hint: incomeTotal > 0 ? `${Math.round((spent / incomeTotal) * 100)}% of income` : 'no income set' },
        { label: 'Left over', value: formatMoney(leftOver), hint: leftOver < 0 ? 'over budget' : 'still available', tone: leftOver < 0 ? 'negative' : 'positive' },
        { label: 'Days remaining', value: daysValue, hint: daysHint },
    ];

    return (
        <div className="stat-tiles">
            {tiles.map(tile => (
                <div key={tile.label} className="stat-tile lift">
                    <span className="stat-tile_label">{tile.label}</span>
                    <strong className={`stat-tile_value ${tile.tone ? `is-${tile.tone}` : ''}`}>{tile.value}</strong>
                    <span className="stat-tile_hint">{tile.hint}</span>
                </div>
            ))}
        </div>
    );
};

export default StatTiles;
