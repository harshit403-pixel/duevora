import mongoose from "mongoose";

const journalEntryLineSchema = new mongoose.Schema({
    journalEntryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JournalEntry",
        required: [true, "Journal entry reference is required"],
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account reference is required"],
    },
    debit: {
        type: Number,
        default: 0,
    },
    credit: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const JournalEntryLine = mongoose.model("JournalEntryLine", journalEntryLineSchema);

export default JournalEntryLine;
