import { categoryLabel, formatMoney } from '../../constants.js';

// Renders the expenses/incomes added so far in the wizard, with remove buttons
const ItemList = ({ items, nameKey, amountKey, typeKey, onRemove, emptyText }) => {
    if (items.length === 0) {
        return <p className="item-list_empty">{emptyText}</p>;
    }

    const total = items.reduce((sum, item) => sum + (Number(item[amountKey]) || 0), 0);

    return (
        <div className="item-list">
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="item-list_row">
                        <span className="item-list_name">{item[nameKey]}</span>
                        <span className="item-list_type">{categoryLabel(item[typeKey])}</span>
                        <span className="item-list_amount">{formatMoney(item[amountKey])}</span>
                        <button
                            type="button"
                            className="icon-button"
                            aria-label={`Remove ${item[nameKey]}`}
                            onClick={() => onRemove(index)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
            <p className="item-list_total">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
            </p>
        </div>
    );
};

export default ItemList;
