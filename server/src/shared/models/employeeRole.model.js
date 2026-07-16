import mongoose from "mongoose";

const employeeRoleSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: [true, "Employee is required"],
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, "Role is required"],
    }
}, {
    timestamps: true
});

// Compound unique index to prevent duplicate roles assigned to an employee
employeeRoleSchema.index({ employeeId: 1, roleId: 1 }, { unique: true });

const EmployeeRole = mongoose.model("EmployeeRole", employeeRoleSchema);

export default EmployeeRole;
