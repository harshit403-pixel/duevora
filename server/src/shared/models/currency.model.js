import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Currency name is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Currency code is required"],
        trim: true,
        uppercase: true,
    },
    symbol: {
        type: String,
        required: [true, "Currency symbol is required"],
        trim: true,
    },
    isBase: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// Unique currency code per organization
currencySchema.index({ organizationId: 1, code: 1 }, { unique: true });

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
