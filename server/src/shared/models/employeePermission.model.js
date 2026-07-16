import mongoose from "mongoose";

const employeePermissionSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: [true, "Employee is required"],
    },
    permissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: [true, "Permission is required"],
    },
    type: {
        type: String,
        enum: ["grant", "deny"],
        default: "grant",
    }
}, {
    timestamps: true
});

// Compound unique index to prevent duplicate permissions assigned directly to an employee
employeePermissionSchema.index({ employeeId: 1, permissionId: 1 }, { unique: true });

const EmployeePermission = mongoose.model("EmployeePermission", employeePermissionSchema);

export default EmployeePermission;
