import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Department name is required"],
    },
    code: {
        type: String,
        required: [true, "Department code is required"],
        trim: true,
        uppercase: true,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
}, {
    timestamps: true
});

// Unique code per organization
departmentSchema.index({ organizationId: 1, code: 1 }, { unique: true });

const Department = mongoose.model("Department", departmentSchema);

export default Department;
