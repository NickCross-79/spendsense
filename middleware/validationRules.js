import { check } from 'express-validator';

export default {
    registration: [
        check('userEmail')
            .isEmail().withMessage('Invalid email'),
        check('firstName')
            .exists().withMessage('Must contain first name')
            .isAlpha().withMessage('Must only contain letters'),
        check('lastName')
            .exists().withMessage('Must contain last name')
            .isAlpha().withMessage('Must only contain letters'),
    ],

    budgetCreation: [
        check('budgetName')
            .exists().withMessage('Must contain budget name'),
        check('startDate')
            .exists().withMessage('Must contain a start date')
            .isDate().withMessage('Start date must be a date'),
        check('endDate')
            .exists().withMessage('Must contain an end date')
            .isDate().withMessage('End date must be a date'),
    ],

    expenseCreation: [
        check('expenseName')
            .exists().withMessage('Must contain expense name'),
        check('expenseType')
            .exists().withMessage('Must contain expesne type'),
        check('expenseAmount')
            .exists().withMessage('Must contain an expense amount')
            .isNumeric().withMessage('Must be a number'),
        check('expenseDate')
            .isDate().withMessage('Must be a date'),
    ],

    incomeCreation: [
        check('incomeName')
            .exists().withMessage('Must contain income name'),
        check('incomeType')
            .exists().withMessage('Must contain income type'),
        check('incomeAmount')
            .exists().withMessage('Must contain an income amount')
            .isNumeric().withMessage('Must be a number'),
        check('incomeFrequency')
            .exists().withMessage('Must contain an income frequency'),
        check('paymentDate')
            .exists()
            .isDate().withMessage('Must contain a valid payment date'),
    ]
}