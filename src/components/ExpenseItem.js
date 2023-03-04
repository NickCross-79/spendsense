function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../icons', false, /\.(png|jpe?g|svg)$/));

const ExpenseItem = (props) => {
    const expense = props.expense

    const getIcon = (expenseType) => {
        switch(expenseType) {
            case 'Subscription':
                return <img src={images['icon_house_.png']} alt={expense.expenseType} />;
            default:
                return <p>{expense.expenseType}</p>;
        }
    }

    return ( 
        <div className="expense-item">
            <div className="expense-item-icon">
                {getIcon(expense.expenseType)}
            </div>
            <div className="expense-item-name">
                <p>{expense.expenseName}</p>
            </div>
            <div className="expense-item-amount">
                <p>${expense.expenseAmount}</p>
            </div>
        </div>
    );
}
 
export default ExpenseItem;