# SpendSense
This is the backend for SpendSense, an online budgeting platform that allows users to monitor their spending day by day, month by month, and year by year.

## Folder structure

controllers/: contains the controller logic for each of the main entities in the application: budget, expense, income, and user.

middleware/: contains validation rules for incoming requests.

models/: contains the data models for each of the main entities in the application.

routes/: contains the route handlers for each of the main HTTP verbs (GET, POST, DELETE).

services/: contains the logic for interfacing with external services such as Plaid, as well as application-specific services such as calculating metrics.

server.js is the entry point for the application.

## Features

-RESTful API: Exposes a RESTful API, which contains endpoints for managing budgets, as well as interfacing indirectly with the Plaid API.

-Authentication and Authorization: Supports authentication and authorization mechanisms to ensure that only authorized users can access budget data and perform operations like creating, retrieving, and deleting budgets.

-Data Validation: Validates incoming data to ensure that it meets specified criteria, such as data type and format, before storing it in the database.

-Data Persistence: Persists budget and user data in a MongoDB cloud database

-Scalability: Designed to be scalable, to handle large volumes of requests and data, and to allow for future growth as the number of users and budgets increases.

-Password Hashing: Utilizes a secure hashing algorithm to protect sensitive user information from brute-force attacks

-Plaid API: Integrates with the Plaid API, allowing users to sign into their financial institutions to monitor transaction data and accoutn balances

## Under Development
-Error Handling: Handling errors gracefully and returning informative error messages to the client when errors occur, such as when a budget cannot be created or retrieved.

-Logging and Monitoring: Logging of important events to ensure that the application is running smoothly, while also allowing for the identification potential issues before they become critical.

-Dynamic budgets: Dynamically updating budgets with expenses and incomes based on account information fetched from the financial institutions of authorized users
