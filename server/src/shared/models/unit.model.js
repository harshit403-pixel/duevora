import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Unit name is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Unit code is required"],
        trim: true,
        uppercase: true,
    }
}, {
    timestamps: true
});

// Unique code per organization
unitSchema.index({ organizationId: 1, code: 1 }, { unique: true });

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;
