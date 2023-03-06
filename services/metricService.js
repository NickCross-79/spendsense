const transformExpenseDataPercentage = (expenseData, incomeAmount) => {
    return new Promise( async (resolve, reject) => {
        const keys = Object.keys(expenseData);
        const result = {};
        keys.forEach(expense => {
            result[expense] = (expenseData[expense] / incomeAmount).toFixed(4);
        });

        result.unspentIncome = ((incomeAmount - Object.values(expenseData).reduce((a, b) => a + b, 0)) / incomeAmount).toFixed(4);

        resolve(result);
    })
}

export default {transformExpenseDataPercentage}