// Importing modules
import ReminderDao from "../../../shared/dao/reminder.dao.js";

import Created from "../../../shared/responses/Created.response.js";

// class to handle reminder operations
class RemindersController {

    constructor() {

        // initializing the reminder dao
        this.reminderDao = new ReminderDao();

    }

    // create a new reminder
    createReminder = async (req, res) => {

        const { title, dueDate, status, invoiceId, paymentId, description } = req.body;
        const organizationId = req.user.organizationId;

        // creating reminder record using reminder dao
        const reminder = await this.reminderDao.create({
            organizationId,
            title: title.trim(),
            dueDate: new Date(dueDate),
            status: status || "pending",
            invoiceId: invoiceId || undefined,
            paymentId: paymentId || undefined,
            description: description || undefined
        });

        // returning the created reminder
        return Created(res, "Reminder created successfully", reminder);

    }

}

export default RemindersController;
