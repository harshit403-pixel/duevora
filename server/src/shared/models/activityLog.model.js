import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
    },
    activity: {
        type: String,
        required: [true, "Activity description is required"],
        trim: true,
    },
    ipAddress: {
        type: String,
        trim: true,
    },
    userAgent: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
