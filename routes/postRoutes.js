import express from 'express';
import 'dotenv/config';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js'
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import PlaidTransactionRequestFlag from '../models/requestFlagModel.js';
import AuthService from '../services/authService.js';

const router = express.Router();
router.use(express.json());

// Register new user
router.post('/register', UserController.registerUser);

// Create a new budget
router.post('/budget/newBudget', AuthService.validateRequest, BudgetController.newBudget);

// Create a new income
router.post('/income/newIncome', AuthService.validateRequest, IncomeController.newIncome);

// Create a new expense
router.post('/expense/newExpense', AuthService.validateRequest, ExpenseController.newExpense);

// Generate Plaid link token
router.post('/plaid/create_link_token/:userId', UserController.generatePLinkToken);

// Exchange public token for access token
router.post('/plaid/exchange_public_token/:pubtoken', UserController.exchangePublicToken);

// Get user transactions
router.post('/user/transactions', UserController.getTransactionData);

// Authenticate user
router.post('/user/authenticate', UserController.authenticateUser);

// Plaid webhook listener
router.post('/plaid/webhook', handleRequest);

async function handleRequest(req, res) {
    console.log("Webhook received");
    if(req.body.webhook_code == "INITIAL_UPDATE"){
        console.log("Initial update hook");
        await PlaidTransactionRequestFlag.updateOne({item_id: req.body.item_id}, { $set: {initial_hook_received: true} });
    } else if(req.body.webhook_code == "HISTORICAL_UPDATE"){
        console.log("Historical update hook");
        await PlaidTransactionRequestFlag.updateOne({item_id: req.body.item_id}, { $set: {historical_hook_received: true}});
    } else console.log("Unknown request");
}

export default router;