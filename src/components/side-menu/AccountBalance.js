const AccountBalance = (props) => {
    return ( 
        <div className="side-menu_account-balance">
            <h3>Chequing</h3>
            {props.balance != null && <h2>${props.balance.accounts[0].balances.available.toFixed(2)}</h2>}
        </div>
     );
}
 
export default AccountBalance;