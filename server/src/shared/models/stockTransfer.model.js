import mongoose from "mongoose";

const stockTransferSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    fromWarehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: [true, "Source warehouse is required"],
    },
    toWarehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: [true, "Destination warehouse is required"],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Transfer quantity is required"],
        min: [1, "Transfer quantity must be at least 1"],
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
    transferDate: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const StockTransfer = mongoose.model("StockTransfer", stockTransferSchema);

export default StockTransfer;
