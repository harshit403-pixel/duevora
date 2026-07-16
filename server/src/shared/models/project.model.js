import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Project name is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Project code is required"],
        trim: true,
        uppercase: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    timestamps: true
});

// Unique project code per organization
projectSchema.index({ organizationId: 1, code: 1 }, { unique: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
