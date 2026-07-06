function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('../../assets/images/icons', false, /\.(png|jpe?g|svg)$/));

const ExpenseItem = (props) => {
    const expense = props.expense

    const getIcon = (expenseType) => {
        return <img src={images['icon_'+expenseType+'_.png']} alt={expense.expenseType} />
    }

    return ( 
        <div className="row" id='expense-item'>
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