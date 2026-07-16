import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    key: {
        type: String,
        required: [true, "Key is required"],
        trim: true,
    },
    value: {
        type: String,
        required: [true, "Value is required"],
        trim: true,
    }
}, {
    timestamps: true
});

// Unique key per organization
settingSchema.index({ organizationId: 1, key: 1 }, { unique: true });

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
