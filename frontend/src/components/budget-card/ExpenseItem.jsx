import { categoryLabel, formatMoney } from '../../constants.js';
import iconCard from '../../assets/images/icons/icon_card_.png';
import iconDebt from '../../assets/images/icons/icon_debt_repayment_.png';
import iconEntertainment from '../../assets/images/icons/icon_entertainment_.png';
import iconFood from '../../assets/images/icons/icon_food_.png';
import iconHealthcare from '../../assets/images/icons/icon_healthcare_.png';
import iconHousing from '../../assets/images/icons/icon_housing_.png';
import iconPersonalCare from '../../assets/images/icons/icon_personal_care_.png';
import iconSavings from '../../assets/images/icons/icon_savings_.png';
import iconTaxes from '../../assets/images/icons/icon_taxes_.png';
import iconTransportation from '../../assets/images/icons/icon_transportation_.png';

const CATEGORY_ICONS = {
    debt_repayment: iconDebt,
    entertainment: iconEntertainment,
    food: iconFood,
    healthcare: iconHealthcare,
    housing: iconHousing,
    personal_care: iconPersonalCare,
    savings: iconSavings,
    taxes: iconTaxes,
    transportation: iconTransportation,
};

const ExpenseItem = ({ expense }) => {
    const icon = CATEGORY_ICONS[String(expense.expenseType).toLowerCase()] || iconCard;

    return (
        <li className="expense-item">
            <img className="expense-item_icon" src={icon} alt="" />
            <div className="expense-item_text">
                <span className="expense-item_name">{expense.expenseName}</span>
                <span className="expense-item_type">{categoryLabel(expense.expenseType)}</span>
            </div>
            <span className="expense-item_amount">{formatMoney(expense.expenseAmount)}</span>
        </li>
    );
};

export default ExpenseItem;
