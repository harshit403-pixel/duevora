import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    taxNumber: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
