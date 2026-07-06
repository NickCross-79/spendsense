import { formatMoney } from '../../constants.js';

const TransactionsList = ({ transactions }) => {
    if (!transactions?.length) return null;

    return (
        <div className="transactions-list">
            <h3>Recent transactions</h3>
            <ul>
                {transactions.slice(0, 5).map(transaction => (
                    <li key={transaction.transaction_id || `${transaction.name}-${transaction.date}`}>
                        <span className="transactions-list_name">
                            {transaction.merchant_name || transaction.name}
                        </span>
                        <span className="transactions-list_amount">{formatMoney(transaction.amount)}</span>
                        <span className="transactions-list_date">{transaction.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionsList;
