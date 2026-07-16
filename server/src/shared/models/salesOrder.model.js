import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Customer is required"],
    },
    orderNumber: {
        type: String,
        required: [true, "Order number is required"],
        trim: true,
    },
    orderDate: {
        type: Date,
        required: [true, "Order date is required"],
    },
    status: {
        type: String,
        enum: ["draft", "pending", "processing", "shipped", "delivered", "cancelled"],
        default: "draft",
    },
    grandTotal: {
        type: Number,
        required: [true, "Grand total is required"],
        default: 0,
    }
}, {
    timestamps: true
});

// Unique order number per organization
salesOrderSchema.index({ organizationId: 1, orderNumber: 1 }, { unique: true });

const SalesOrder = mongoose.model("SalesOrder", salesOrderSchema);

export default SalesOrder;
