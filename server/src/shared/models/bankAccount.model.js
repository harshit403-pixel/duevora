import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    bankName: {
        type: String,
        required: [true, "Bank name is required"],
        trim: true,
    },
    accountNumber: {
        type: String,
        required: [true, "Account number is required"],
        trim: true,
    },
    ifscCode: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account reference is required"],
    }
}, {
    timestamps: true
});

// Unique account number per organization
bankAccountSchema.index({ organizationId: 1, accountNumber: 1 }, { unique: true });

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

export default BankAccount;
