import mongoose from "mongoose";

const voucherTypeSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    name: {
        type: String,
        required: [true, "Voucher type name is required"],
        trim: true,
    },
    code: {
        type: String,
        required: [true, "Voucher type code is required"],
        trim: true,
        uppercase: true,
    }
}, {
    timestamps: true
});

// Unique code per organization
voucherTypeSchema.index({ organizationId: 1, code: 1 }, { unique: true });

const VoucherType = mongoose.model("VoucherType", voucherTypeSchema);

export default VoucherType;
