import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    if(mongod) await mongod.stop();
});

// Registers a user and returns a supertest agent holding their auth cookie
async function loggedInAgent(email) {
    const agent = request.agent(app);
    await agent.post('/register').send({
        userEmail: email,
        firstName: 'Test',
        lastName: 'User',
        userPassword: 'correct-horse-battery',
    }).expect(200);
    await agent.post('/user/authenticate').send({
        userEmail: email,
        userPassword: 'correct-horse-battery',
    }).expect(200);
    return agent;
}

describe('registration', () => {
    it('rejects a registration without a password', async () => {
        const res = await request(app).post('/register').send({
            userEmail: 'nopass@example.com',
            firstName: 'No',
            lastName: 'Pass',
        });
        expect(res.status).toBe(400);
    });

    it('rejects a duplicate email with 409', async () => {
        const user = {
            userEmail: 'dupe@example.com',
            firstName: 'Du',
            lastName: 'Pe',
            userPassword: 'a-long-password',
        };
        await request(app).post('/register').send(user).expect(200);
        await request(app).post('/register').send(user).expect(409);
    });
});

describe('authentication', () => {
    it('rejects a wrong password with 401', async () => {
        await request(app).post('/register').send({
            userEmail: 'auth@example.com',
            firstName: 'Auth',
            lastName: 'User',
            userPassword: 'the-right-password',
        }).expect(200);

        const res = await request(app).post('/user/authenticate').send({
            userEmail: 'auth@example.com',
            userPassword: 'the-wrong-password',
        });
        expect(res.status).toBe(401);
    });

    it('rejects an unknown email with 401', async () => {
        const res = await request(app).post('/user/authenticate').send({
            userEmail: 'nobody@example.com',
            userPassword: 'whatever-password',
        });
        expect(res.status).toBe(401);
    });

    it('sets an auth cookie on correct credentials and serves /user', async () => {
        const agent = await loggedInAgent('happy@example.com');
        const res = await agent.get('/user').expect(200);
        expect(res.body.userEmail).toBe('happy@example.com');
    });

    it('rejects requests without an auth cookie with 401', async () => {
        await request(app).get('/user').expect(401);
        await request(app).get('/user/budgets').expect(401);
    });

    it('clears the cookie on logout', async () => {
        const agent = await loggedInAgent('logout@example.com');
        await agent.post('/user/logout').expect(200);
        await agent.get('/user').expect(401);
    });
});

describe('budget ownership', () => {
    it('prevents one user from reading or deleting another user\'s budget', async () => {
        const alice = await loggedInAgent('alice@example.com');
        const mallory = await loggedInAgent('mallory@example.com');

        await alice.post('/budget/newBudget').send({
            budgetName: 'Alice budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
        }).expect(200);
        const budgets = (await alice.get('/user/budgets').expect(200)).body;
        expect(budgets).toHaveLength(1);
        const budgetId = budgets[0]._id;

        await alice.get(`/budget/${budgetId}`).expect(200);
        await mallory.get(`/budget/${budgetId}`).expect(403);
        await mallory.delete(`/budget/${budgetId}`).expect(403);
        await request(app).get(`/budget/${budgetId}`).expect(401);

        await alice.delete(`/budget/${budgetId}`).expect(200);
        await alice.get(`/budget/${budgetId}`).expect(404);
    });

    it('404s for a malformed or unknown budget id', async () => {
        const agent = await loggedInAgent('missing@example.com');
        await agent.get('/budget/not-an-id').expect(404);
        await agent.get(`/budget/${new mongoose.Types.ObjectId()}`).expect(404);
    });
});

describe('budget stats', () => {
    it('returns zeroed stats for a budget with no incomes or expenses', async () => {
        const agent = await loggedInAgent('empty@example.com');
        await agent.post('/budget/newBudget').send({
            budgetName: 'Empty budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
        }).expect(200);
        const budgetId = (await agent.get('/user/budgets')).body[0]._id;

        const res = await agent.get(`/budget/${budgetId}/stats`).expect(200);
        expect(res.body.incomeTotal).toBe(0);
        expect(res.body.incomeList).toEqual([]);
        expect(res.body.expenseList).toEqual([]);
    });

    it('computes income totals and expense percentages by type', async () => {
        const agent = await loggedInAgent('stats@example.com');

        const incomeId = (await agent.post('/income/newIncome').send({
            incomeName: 'Salary',
            incomeType: 'employment',
            incomeAmount: 1000,
            incomeFrequency: 'monthly',
            paymentDate: '2026-01-15',
        }).expect(200)).body;

        const expenseIds = [];
        for (const amount of [200, 300]) {
            expenseIds.push((await agent.post('/expense/newExpense').send({
                expenseName: `Groceries ${amount}`,
                expenseType: 'food',
                expenseAmount: amount,
                expenseDate: '2026-01-10',
            }).expect(200)).body);
        }

        await agent.post('/budget/newBudget').send({
            budgetName: 'Stats budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
            incomes: [incomeId],
            expenses: expenseIds,
        }).expect(200);
        const budgetId = (await agent.get('/user/budgets')).body[0]._id;

        const stats = (await agent.get(`/budget/${budgetId}/stats`).expect(200)).body;
        expect(stats.budgetName).toBe('Stats budget');
        expect(stats.incomeTotal).toBe(1000);
        expect(stats.expenseTypes).toContain('food');
        // 500 of 1000 income spent on food, 500 unspent
        expect(stats.expensePercentagesByType.food).toBe('0.5000');
        expect(stats.expensePercentagesByType.unspentIncome).toBe('0.5000');
    });
});

describe('expense and income lifecycle', () => {
    it('deleting an expense responds 200 and detaches it from budgets', async () => {
        const agent = await loggedInAgent('expenses@example.com');
        const expenseId = (await agent.post('/expense/newExpense').send({
            expenseName: 'Bus pass',
            expenseType: 'transport',
            expenseAmount: 90,
            expenseDate: '2026-02-01',
        }).expect(200)).body;

        await agent.post('/budget/newBudget').send({
            budgetName: 'Transit budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
            expenses: [expenseId],
        }).expect(200);
        const budgetId = (await agent.get('/user/budgets')).body[0]._id;

        await agent.delete(`/expense/${expenseId}`).expect(200);
        await agent.get(`/expense/${expenseId}`).expect(404);
        const expenses = (await agent.get(`/budget/${budgetId}/expenses`).expect(200)).body;
        expect(expenses).toEqual([]);
    });

    it('rejects invalid expense payloads with 400', async () => {
        const agent = await loggedInAgent('badexpense@example.com');
        await agent.post('/expense/newExpense').send({
            expenseName: 'No amount',
            expenseType: 'misc',
            expenseDate: '2026-02-01',
        }).expect(400);
    });
});

describe('transaction import (dynamic budgets)', () => {
    it('imports Plaid-shaped transactions as expenses on the budget', async () => {
        const agent = await loggedInAgent('importer@example.com');
        await agent.post('/budget/newBudget').send({
            budgetName: 'Import budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
        }).expect(200);
        const budgetId = (await agent.get('/user/budgets')).body[0]._id;

        const res = await agent.post(`/budget/${budgetId}/expenses/import`).send({
            transactions: [
                { name: 'UBER TRIP', merchant_name: 'Uber', amount: 24.5, date: '2026-03-02', personal_finance_category: { primary: 'TRANSPORTATION' } },
                { name: 'METRO STORE', amount: 80.25, date: '2026-03-03', category: ['Food and Drink'] },
            ],
        }).expect(200);
        expect(res.body).toHaveLength(2);

        const expenses = (await agent.get(`/budget/${budgetId}/expenses`).expect(200)).body;
        expect(expenses).toHaveLength(2);

        const imported = (await agent.get(`/expense/${res.body[0]}`).expect(200)).body;
        expect(imported.expenseName).toBe('Uber');
        expect(imported.expenseType).toBe('TRANSPORTATION');
    });

    it('rejects an import into someone else\'s budget', async () => {
        const owner = await loggedInAgent('owner@example.com');
        const intruder = await loggedInAgent('intruder@example.com');
        await owner.post('/budget/newBudget').send({
            budgetName: 'Private budget',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
        }).expect(200);
        const budgetId = (await owner.get('/user/budgets')).body[0]._id;

        await intruder.post(`/budget/${budgetId}/expenses/import`).send({
            transactions: [{ name: 'X', amount: 1, date: '2026-01-01' }],
        }).expect(403);
    });
});
