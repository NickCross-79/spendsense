export const EXPENSE_CATEGORIES = [
    { value: 'debt_repayment', label: 'Debt Repayment' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'food', label: 'Food' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'housing', label: 'Housing' },
    { value: 'personal_care', label: 'Personal Care' },
    { value: 'savings', label: 'Savings' },
    { value: 'taxes', label: 'Taxes' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' },
];

export const INCOME_CATEGORIES = [
    { value: 'alimony_child_support', label: 'Alimony/Child Support' },
    { value: 'freelance_side_hustle', label: 'Freelance/Side Hustle' },
    { value: 'gift_windfall', label: 'Gift/Windfall' },
    { value: 'government_benefits', label: 'Government Benefits' },
    { value: 'investment', label: 'Investment' },
    { value: 'rental', label: 'Rental' },
    { value: 'salary_wage', label: 'Salary/Wage' },
    { value: 'other', label: 'Other' },
];

export const INCOME_FREQUENCIES = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'bi-annual', label: 'Bi-annual' },
    { value: 'annual', label: 'Annual' },
];

const categoryLabels = Object.fromEntries(
    [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map(c => [c.value, c.label])
);

// Human-readable label for a stored category value. Imported Plaid
// categories (e.g. "TRANSPORTATION") fall back to a title-cased version.
export function categoryLabel(value) {
    if (!value) return 'Other';
    if (value === 'unspentIncome') return 'Unspent income';
    if (categoryLabels[value]) return categoryLabels[value];
    return value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, ch => ch.toUpperCase());
}

export function formatMoney(amount) {
    const value = Number(amount) || 0;
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
