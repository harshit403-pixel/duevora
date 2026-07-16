import mongoose from "mongoose";

const deliveryChallanSchema = new mongoose.Schema({
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
    challanNumber: {
        type: String,
        required: [true, "Challan number is required"],
        trim: true,
    },
    challanDate: {
        type: Date,
        required: [true, "Challan date is required"],
    },
    status: {
        type: String,
        enum: ["draft", "dispatched", "delivered", "cancelled"],
        default: "draft",
    }
}, {
    timestamps: true
});

// Unique delivery challan number per organization
deliveryChallanSchema.index({ organizationId: 1, challanNumber: 1 }, { unique: true });

const DeliveryChallan = mongoose.model("DeliveryChallan", deliveryChallanSchema);

export default DeliveryChallan;
