// Importing modules
import CostCenterDao from "../../../shared/dao/costCenter.dao.js";

import Conflict from "../../../shared/errors/Conflict.error.js";

import Created from "../../../shared/responses/Created.response.js";

// class to handle cost center operations
class CostCentersController {

    constructor() {

        // initializing the cost center dao
        this.costCenterDao = new CostCenterDao();

    }

    // create a new cost center
    createCostCenter = async (req, res) => {

        const { name, code, status } = req.body;
        const organizationId = req.user.organizationId;

        // formatting the cost center code to uppercase
        const formattedCode = code.trim().toUpperCase();

        // verifying cost center code is unique within the organization context
        const existing = await this.costCenterDao.findOne({ organizationId, code: formattedCode });

        if (existing) {

            throw new Conflict("Cost center code already exists in your organization.");

        }

        // creating the cost center record using cost center dao
        const costCenter = await this.costCenterDao.create({
            organizationId,
            name: name.trim(),
            code: formattedCode,
            status: status || "active"
        });

        // returning the created cost center
        return Created(res, "Cost center created successfully", costCenter);

    }

}

export default CostCentersController;
