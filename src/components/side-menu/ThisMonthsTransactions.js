import { useEffect, useState } from "react";

const ThisMonthsTransactions = (props) => {
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        if(props.transactions != null) {
            setTransactions(props.transactions.transactions);
        }
    });
    
    return ( 
        <div className="side-menu_this-months-transactions">
            <h3>Recent Transactions</h3>
            {transactions != null && 
                transactions
                    .slice(0, 5)
                    .map(transaction => {
                        return (
                            <div className="side-menu_this-months-transactions_item">
                                <p className="side-menu_this-months-transactions_item_name">
                                    {transaction.merchant_name == null ? transaction.name : transaction.merchant_name}</p>
                                <p className="side-menu_this-months-transactions_item_amount">
                                    ${transaction.amount.toFixed(2)}</p>
                                <p className="side-menu_this-months-transactions_item_date">
                                    {transaction.date}</p>
                            </div>
                        )
                    })
            }
        </div>
     );
}
 
export default ThisMonthsTransactions;