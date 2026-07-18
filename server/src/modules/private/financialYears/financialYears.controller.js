// Importing modules
import FinancialYearDao from "../../../shared/dao/financialYear.dao.js";

import BadRequest from "../../../shared/errors/BadRequest.error.js";
import NotFound from "../../../shared/errors/NotFound.error.js";

import Created from "../../../shared/responses/Created.response.js";
import Ok from "../../../shared/responses/Ok.response.js";

// class to handle financial year operations
class FinancialYearsController {

    constructor() {

        // initializing the financial year dao
        this.financialYearDao = new FinancialYearDao();

    }

    // create a new financial year
    createFinancialYear = async (req, res) => {

        const { name, startDate, endDate } = req.body;
        const organizationId = req.user.organizationId;

        // parsing start and end dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        // validating end date is after start date
        if (end <= start) {

            throw new BadRequest("End date must be after start date.");

        }

        // creating financial year record using financial year dao
        const financialYear = await this.financialYearDao.create({
            organizationId,
            name: name.trim(),
            startDate: start,
            endDate: end
        });

        // returning the created financial year
        return Created(res, "Financial year created successfully", financialYear);

    }

    // archive an existing financial year
    archiveFinancialYear = async (req, res) => {

        const { fyId } = req.params;
        const organizationId = req.user.organizationId;

        // finding the financial year scoped to the organization
        const financialYear = await this.financialYearDao.findOne({ _id: fyId, organizationId });

        // checking financial year exists
        if (!financialYear) {

            throw new NotFound("Financial year not found.");

        }

        // checking financial year is not already archived
        if (financialYear.isClosed) {

            throw new BadRequest("Financial year is already archived.");

        }

        // closing/archiving the financial year
        const archived = await this.financialYearDao.updateById(fyId, { isClosed: true });

        // returning the archived financial year
        return Ok(res, "Financial year archived successfully", archived);

    }

}

export default FinancialYearsController;
