import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    financialYearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinancialYear",
        required: [true, "Financial year reference is required"],
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account reference is required"],
    },
    amount: {
        type: Number,
        required: [true, "Budget amount is required"],
        min: [0, "Budget amount cannot be negative"],
    }
}, {
    timestamps: true
});

// Unique budget per account per financial year
budgetSchema.index({ financialYearId: 1, accountId: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
