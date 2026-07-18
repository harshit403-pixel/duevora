// Importing modules
import NotificationDao from "../../../shared/dao/notification.dao.js";

import Ok from "../../../shared/responses/Ok.response.js";

// class to handle notifications operations
class NotificationsController {

    constructor() {

        // initializing the notification dao
        this.notificationDao = new NotificationDao();

    }

    // list notifications for the current user
    listNotifications = async (req, res) => {

        // extracting pagination parameters from query
        const { page = 1, limit = 20 } = req.query;
        const organizationId = req.user.organizationId;
        const userId = req.user._id;

        // calculating skip offset for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const filter = { organizationId, userId };

        // fetching notifications and total count in parallel
        const [notifications, total] = await Promise.all([
            this.notificationDao.Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            this.notificationDao.Model.countDocuments(filter)
        ]);

        // returning the paginated notifications list
        return Ok(res, "Notifications retrieved successfully", {
            notifications, total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit))
        });

    }

}

export default NotificationsController;
