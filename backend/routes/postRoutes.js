import express from 'express';
import 'dotenv/config';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js'
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import PlaidTransactionRequestFlag from '../models/requestFlagModel.js';
import AuthService from '../services/authService.js';
import { validationResult } from 'express-validator';
import validationRules from '../middleware/validationRules.js';
import ownership from '../middleware/ownership.js';

const router = express.Router();
router.use(express.json());

// Rejects the request with the validation errors, if any
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    next();
}

// Register new user
router.post('/register', validationRules.registration, handleValidationErrors, UserController.registerUser);

// Create a new budget
router.post('/budget/newBudget', AuthService.validateRequest, validationRules.budgetCreation, handleValidationErrors, BudgetController.newBudget);

// Create a new income
router.post('/income/newIncome', AuthService.validateRequest, validationRules.incomeCreation, handleValidationErrors, IncomeController.newIncome);

// Create a new expense
router.post('/expense/newExpense', AuthService.validateRequest, validationRules.expenseCreation, handleValidationErrors, ExpenseController.newExpense);

// Import Plaid transactions into a budget as expenses
router.post('/budget/:id/expenses/import', AuthService.validateRequest, ownership.budget, BudgetController.importTransactions);

// Generate Plaid link token (the authenticated user's id is taken from the JWT)
router.post('/plaid/create_link_token/:userId', AuthService.validateRequest, UserController.generatePLinkToken);

// Exchange public token for access token
router.post('/plaid/exchange_public_token/:pubtoken', AuthService.validateRequest, UserController.exchangePublicToken);

// Get user transactions
router.post('/user/transactions', AuthService.validateRequest, UserController.getTransactionData);

// Authenticate user
router.post('/user/authenticate', UserController.authenticateUser);

// Log out (clear auth cookie)
router.post('/user/logout', UserController.logoutUser);

// Plaid webhook listener
router.post('/plaid/webhook', handleWebhook);

async function handleWebhook(req, res) {
    try {
        if(req.body.webhook_code == "INITIAL_UPDATE"){
            await PlaidTransactionRequestFlag.updateOne({item_id: req.body.item_id}, { $set: {initial_hook_received: true} });
        } else if(req.body.webhook_code == "HISTORICAL_UPDATE"){
            await PlaidTransactionRequestFlag.updateOne({item_id: req.body.item_id}, { $set: {historical_hook_received: true}});
        }
        res.sendStatus(200);
    } catch (err) {
        console.log("Failed to handle Plaid webhook", err);
        res.sendStatus(500);
    }
}

export default router;
