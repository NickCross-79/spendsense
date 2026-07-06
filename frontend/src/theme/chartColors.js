// Categorical palette for expense types, validated with the dataviz
// six-checks script against the white card surface (worst adjacent CVD
// dE 21.2; sub-3:1 slots get relief from the always-on legend + tooltips).
// Color follows the category (fixed mapping), never its rank in the data.
export const CATEGORY_COLORS = {
    housing: '#2a78d6',
    food: '#eb6834',
    transportation: '#1baf7a',
    healthcare: '#e34948',
    entertainment: '#e87ba4',
    savings: '#8a4fff',
    personal_care: '#eda100',
    taxes: '#008300',
    debt_repayment: '#4a3aa7',
    other: '#b07b28',
};

// Deliberately neutral: the "nothing spent" remainder of the doughnut
export const UNSPENT_COLOR = '#e3e0ef';

export function categoryColor(type) {
    if (type === 'unspentIncome') return UNSPENT_COLOR;
    return CATEGORY_COLORS[String(type).toLowerCase()] || CATEGORY_COLORS.other;
}

export const CHART_INK = {
    primary: '#151a24',
    secondary: '#5c6470',
    grid: '#e9e7f2',
};
