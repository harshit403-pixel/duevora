import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    entryNumber: {
        type: String,
        required: [true, "Entry number is required"],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    narration: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["draft", "posted"],
        default: "draft",
    }
}, {
    timestamps: true
});

// Unique entry number per organization
journalEntrySchema.index({ organizationId: 1, entryNumber: 1 }, { unique: true });

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
