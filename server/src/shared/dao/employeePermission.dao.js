import EmployeePermission from "../models/employeePermission.model.js";

class EmployeePermissionDao {
    constructor() {
        this.Model = EmployeePermission;
    }

    async create(data, session = null) {
        const doc = new this.Model(data);
        return await doc.save({ session });
    }

    async findById(id, session = null) {
        return await this.Model.findById(id).populate("employeeId permissionId").session(session);
    }

    async findOne(filter, session = null) {
        return await this.Model.findOne(filter).populate("employeeId permissionId").session(session);
    }

    async find(filter = {}, options = {}, session = null) {
        let query = this.Model.find(filter).populate("employeeId permissionId").session(session);
        if (options.sort) query = query.sort(options.sort);
        if (options.limit) query = query.limit(options.limit);
        if (options.skip) query = query.skip(options.skip);
        return await query;
    }

    async updateById(id, updateData, session = null) {
        return await this.Model.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
            session
        }).populate("employeeId permissionId");
    }

    async deleteById(id, session = null) {
        return await this.Model.findByIdAndDelete(id, { session });
    }
}

export default EmployeePermissionDao;
