import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    title: {
        type: String,
        required: [true, "Reminder title is required"],
        trim: true,
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    description: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
