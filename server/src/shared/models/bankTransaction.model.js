import mongoose from "mongoose";

const bankTransactionSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    bankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
        required: [true, "Bank account is required"],
    },
    transactionDate: {
        type: Date,
        required: [true, "Transaction date is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0.01, "Amount must be greater than zero"],
    },
    type: {
        type: String,
        enum: ["deposit", "withdrawal"],
        required: [true, "Transaction type is required"],
    },
    reference: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const BankTransaction = mongoose.model("BankTransaction", bankTransactionSchema);

export default BankTransaction;
