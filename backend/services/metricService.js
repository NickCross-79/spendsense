// Express each expense type as a fraction of total income; when there is no
// income every percentage is reported as 0 to avoid dividing by zero.
const transformExpenseDataPercentage = (expenseData, incomeAmount) => {
    const result = {};

    if(!incomeAmount || incomeAmount <= 0) {
        Object.keys(expenseData).forEach(expense => {
            result[expense] = (0).toFixed(4);
        });
        result.unspentIncome = (0).toFixed(4);
        return result;
    }

    Object.keys(expenseData).forEach(expense => {
        result[expense] = (expenseData[expense] / incomeAmount).toFixed(4);
    });

    result.unspentIncome = ((incomeAmount - Object.values(expenseData).reduce((a, b) => a + b, 0)) / incomeAmount).toFixed(4);

    return result;
}

export default {transformExpenseDataPercentage}
