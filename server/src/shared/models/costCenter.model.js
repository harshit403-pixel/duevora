import mongoose from "mongoose";

const costCenterSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Cost center name is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Cost center code is required"],
        trim: true,
        uppercase: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    timestamps: true
});

// Unique code per organization
costCenterSchema.index({ organizationId: 1, code: 1 }, { unique: true });

const CostCenter = mongoose.model("CostCenter", costCenterSchema);

export default CostCenter;
