import { formatMoney } from '../../constants.js';

const AccountBalance = ({ accounts }) => {
    const account = accounts?.[0];
    if (!account) return null;

    const balance = account.balances?.available ?? account.balances?.current;

    return (
        <div className="account-balance">
            <span className="account-balance_name">{account.name}</span>
            <strong className="account-balance_amount">
                {balance != null ? formatMoney(balance) : '—'}
            </strong>
        </div>
    );
};

export default AccountBalance;
