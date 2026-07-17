// Importing modules
import SalesOrderDao from "../../../shared/dao/salesOrder.dao.js";
import NotFound from "../../../shared/errors/NotFound.error.js";
import BadRequest from "../../../shared/errors/BadRequest.error.js";
import Ok from "../../../shared/responses/Ok.response.js";

// class to handle sales order operations
class SalesOrdersController {

    constructor() {

        // initializing the sales order dao
        this.salesOrderDao = new SalesOrderDao();

    }

    // approve a sales order
    approveSalesOrder = async (req, res) => {

        const { orderId } = req.params;
        const organizationId = req.user.organizationId;

        // finding the sales order within organization context
        const order = await this.salesOrderDao.findOne({
            _id: orderId,
            organizationId
        });

        if (!order) {

            throw new NotFound("Sales order not found in your organization.");

        }

        if (order.status !== "draft") {

            throw new BadRequest("Only draft sales orders can be approved.");

        }

        // updating status of sales order to processing (approved for fulfillment)
        const updatedOrder = await this.salesOrderDao.updateById(orderId, {
            status: "processing"
        });

        return Ok(res, "Sales order approved successfully", updatedOrder);

    }

}

export default SalesOrdersController;
