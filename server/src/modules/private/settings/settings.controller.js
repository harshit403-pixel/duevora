// Importing modules
import SettingDao from "../../../shared/dao/setting.dao.js";

import Ok from "../../../shared/responses/Ok.response.js";

// class to handle settings operations
class SettingsController {

    constructor() {

        // initializing the setting dao
        this.settingDao = new SettingDao();

    }

    // upsert a setting key-value pair for the organization
    upsertSetting = async (req, res) => {

        const { key, value } = req.body;
        const organizationId = req.user.organizationId;

        // upserting the setting record using setting dao
        const setting = await this.settingDao.Model.findOneAndUpdate(
            { organizationId, key: key.trim() },
            { value: value.trim() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // returning the upserted setting
        return Ok(res, "Setting updated successfully", setting);

    }

}

export default SettingsController;
