import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Vendor is required"],
    },
    purchaseNumber: {
        type: String,
        required: [true, "Purchase number is required"],
        trim: true,
    },
    purchaseDate: {
        type: Date,
        required: [true, "Purchase date is required"],
    },
    subTotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        default: 0,
    },
    taxTotal: {
        type: Number,
        required: [true, "Tax total is required"],
        default: 0,
    },
    grandTotal: {
        type: Number,
        required: [true, "Grand total is required"],
        default: 0,
    },
    status: {
        type: String,
        enum: ["billed", "paid", "partially_paid"],
        default: "billed",
    }
}, {
    timestamps: true
});

// Unique purchase number per organization
purchaseSchema.index({ organizationId: 1, purchaseNumber: 1 }, { unique: true });

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
