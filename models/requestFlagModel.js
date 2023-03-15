import mongoose from "mongoose";

const PlaidTransactionRequestFlagSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true,
    },
    initial_hook_received: {
        type: Boolean,
        required: true,
    },
    historical_hook_received: {
        type: Boolean,
        required: true,
    },
});
export default mongoose.model('PlaidTransactionRequestFlag', PlaidTransactionRequestFlagSchema);