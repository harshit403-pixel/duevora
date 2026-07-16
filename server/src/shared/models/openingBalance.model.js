import mongoose from "mongoose";

const openingBalanceSchema = new mongoose.Schema({
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
    debit: {
        type: Number,
        default: 0,
    },
    credit: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

// Ensure a single opening balance record exists per account per financial year
openingBalanceSchema.index({ financialYearId: 1, accountId: 1 }, { unique: true });

const OpeningBalance = mongoose.model("OpeningBalance", openingBalanceSchema);

export default OpeningBalance;
