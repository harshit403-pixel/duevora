// Importing modules
import AuditLogDao from "../../../shared/dao/auditLog.dao.js";

import Ok from "../../../shared/responses/Ok.response.js";

// class to handle audit log operations
class AuditLogsController {

    constructor() {

        // initializing the auditLog dao
        this.auditLogDao = new AuditLogDao();

    }

    // list audit logs with pagination and optional entity type filter
    listAuditLogs = async (req, res) => {

        const { page = 1, limit = 20, entityType } = req.query;
        const organizationId = req.user.organizationId;

        // calculating pagination skip offset
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // building the filter object
        const filter = { organizationId };

        // filtering by entity type if provided
        if (entityType) {

            filter.entityType = entityType;

        }

        // fetching logs and total count in parallel
        const [logs, total] = await Promise.all([
            this.auditLogDao.Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate("userId", "name email"),
            this.auditLogDao.Model.countDocuments(filter)
        ]);

        // returning the paginated audit logs
        return Ok(res, "Audit logs retrieved successfully", {
            logs, total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit))
        });

    }

}

export default AuditLogsController;
