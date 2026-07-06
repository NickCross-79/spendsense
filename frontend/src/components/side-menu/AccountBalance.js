const AccountBalance = (props) => {
    return ( 
        <div className="side-menu_account-balance">
            <h3 className="side-menu_account-balance_name">
                {props.balance.accounts[0].name}</h3>
            {props.balance != null && <h2 className="side-menu_account-balance_balance">
                ${props.balance.accounts[0].balances.available.toFixed(2)}</h2>}
        </div>
     );
}
 
export default AccountBalance;