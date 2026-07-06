import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';

// Loads the resource at req.params.id and rejects the request unless it
// belongs to the authenticated user. Must run after AuthService.validateRequest.
const verifyOwnership = (Model) => async (req, res, next) => {
    try {
        const resource = await Model.findById(req.params.id);
        if(resource == null) return res.status(404).json({msg: 'Not found'});
        if(resource.userId == null || resource.userId.toString() !== req.decodedToken.userId) {
            return res.status(403).json({msg: 'Forbidden'});
        }
        next();
    } catch (err) {
        // Malformed ids fail the findById cast
        res.status(404).json({msg: 'Not found'});
    }
};

export default {
    budget: verifyOwnership(Budget),
    income: verifyOwnership(Income),
    expense: verifyOwnership(Expense),
};
